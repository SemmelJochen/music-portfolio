export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
        <span className="text-black dark:text-white text-sm tracking-wide animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
}
