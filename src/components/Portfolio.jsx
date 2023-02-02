import Images from "../PortfolioImages/Images.jsx";

export default function Portfolio() {
  return (
    <div className="w-full justify-center flex mt-20 pb-8">
      <div className="lg:w-1/2 max-w-xl flex flex-col justify-top">
        <div className="text-3xl font-bold font-white">My work</div>
        <span className="text-md pt-4 pb-8">
          Many of my personal projects come from combining my love of technology
          with other hobbies. I've always been driven to discover how software
          and technology can solve problems, not only for myself, but for
          everyone, in intuitive and untraditional ways.
        </span>
        <hr className="h-[1px] bg-white opacity-10" />
        <div className="pt-8 pb-10 font-semibold">Key work</div>
        <div className="text-sm pb-10" id="monitr">
          <div className="font-semibold pb-2">Monitr (2021-Present)</div>
          <div className="pb-2">
            I founded Monitr (formerly Monitr.gg) in 2021 to give access to
            high-quality e-commerce monitoring tools to anyone.
          </div>
          <div className="pb-2">
            Monitr was a platform that kept track of thousands of products
            across 200+ websites. Monitr's goal was to help any user get any
            item they want, being developed during a time where PlayStation 5s
            were never in stock for more than a few seconds. This platform was
            extensible; setting up to allow new use-cases for this constant
            stream of product data.
          </div>
          <div className="pt-2 pb-4">
            <img src={Images.PingsTable} />
          </div>
          <div className="flex flex-row justify-center rounded-sm">
            <img src={Images.SearchMobile} className="w-6/12 rounded-sm" />
            <img
              src={Images.NotificationsMobile}
              className="w-6/12 ml-4 rounded-sm"
            />
          </div>
          <div className="pt-2">
            Monitr's users were notified of restocks and new products across
            push notifications (Android, iOS, browser), webhooks (Discord), and
            websockets within a second of it being detected. This resulted in
            successful checkouts for coveted shoes, gaming consoles, and
            graphics cards.
          </div>
        </div>
        <div className="text-sm" id="wrath">
          <div className="font-semibold pb-2">Wrath (2018-2021)</div>
          <div className="pb-2">
            I partnered with another developer in 2018 to create Wrath, an
            invite-only checkout automation software. I was bought out of Wrath
            in 2021.
          </div>
          <div className="pb-2">
            Wrath was an application created to do one thing: help users acquire
            high-demand shoes for retail price. What initially started out as
            just supporting Shopify-managed storefronts, grew to encompass any
            major website doing similar high-demand drops.
          </div>
          <div className="pt-2 pb-4">
            <img src={Images.WrathDashboard} />
          </div>
          <div className="pt-2 pb-2">
            <img src={Images.WrathTasks} />
          </div>
          <div className="pt-2">
            Wrath has left an incredible mark on the e-commerce world with
            millions of checkouts (and declines) across hundreds of sites. It
            has continued to advance, retaining thousands of monthly active
            users.
          </div>
        </div>
      </div>
    </div>
  );
}
