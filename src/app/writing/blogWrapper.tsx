import Header from "@/app/components/header";

export default function BlogWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 lg:flex lg:justify-center lg:w-full">
      <div className="lg:w-5/12">
        <Header blog />
        <section className="py-16">{children}</section>
      </div>
    </main>
  );
}
