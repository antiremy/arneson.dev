export function StickyTitle({ title }: { title: string }) {
  return (
    <div className="sticky top-14 z-40 mt-0 flex w-full flex-row items-center justify-start bg-white pt-4 pb-4 text-lg font-semibold backdrop-blur-sm lg:top-16 dark:bg-gray-800">
      {title}
    </div>
  );
}
