import { PageDataProvider } from "../../context/pageDataContext";
import { Header } from "./_ui/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageDataProvider>
      <div className="h-screen w-full pt-12">
        <Header />
        <div className="scrollbar z-0 flex h-full w-full justify-center overflow-x-hidden overflow-y-auto">
          <div className="max-w-2xl px-4 text-sm">{children}</div>
        </div>
      </div>
    </PageDataProvider>
  );
}
