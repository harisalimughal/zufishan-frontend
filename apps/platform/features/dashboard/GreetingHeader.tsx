export function GreetingHeader() {
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {greeting}, Harry 👋
      </h1>
      <p className="mt-1 text-sm text-gray-400">
        Ready to learn something amazing today?
      </p>
    </div>
  );
}
