#!/usr/bin/env node
// Posts a build/deploy status update to a Discord webhook.
// Reads its inputs from env vars so callers never need to worry about
// shell-quoting branch names, commit messages, etc.

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
if (!webhookUrl) {
  console.log("DISCORD_WEBHOOK_URL not set, skipping Discord notification.");
  process.exit(0);
}

const isSuccess = process.env.STATUS === "success";

const fields = [
  { name: "Branch", value: process.env.REF_NAME || "unknown", inline: true },
  {
    name: "Commit",
    value: `\`${(process.env.SHA || "unknown").slice(0, 7)}\``,
    inline: true,
  },
  { name: "Triggered by", value: process.env.ACTOR || "unknown", inline: true },
];

if (process.env.PR_NUMBER) {
  fields.push({
    name: "Pull Request",
    value: `#${process.env.PR_NUMBER}`,
    inline: true,
  });
}

const embed = {
  title: `${process.env.WORKFLOW_TITLE || "Workflow"}: ${isSuccess ? "Success" : "Failure"}`,
  url: process.env.RUN_URL,
  color: isSuccess ? 0x2ecc71 : 0xe74c3c,
  fields,
  timestamp: new Date().toISOString(),
};

const response = await fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ embeds: [embed] }),
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Discord webhook request failed: ${response.status} ${body}`);
  process.exit(1);
}

console.log("Discord notification sent.");
