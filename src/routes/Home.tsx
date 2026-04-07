export default function Home() {
  const headline = "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.";
  const body = "Stephen Hawking";

  return (
    <div className="h-[calc(100vh-70px)] w-full flex items-center justify-center flex-col text-center">
      <div className="w-4/5">
        <h1 className="text-3xl md:text-5xl font-normal text-black dark:text-white leading-tight">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl text-black dark:text-white mt-4">
          {body}
        </p>
      </div>
    </div>
  );
}
