const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917075810619";
const DEFAULT_MESSAGE = "Hi RideX360, I'd like to know more about your platform.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RideX360 on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.383.688 4.605 1.938 6.484L4 29l7.71-1.898A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm.002 21.75a9.7 9.7 0 0 1-4.94-1.348l-.354-.209-4.575 1.126 1.152-4.457-.23-.367A9.71 9.71 0 0 1 5.25 15c0-5.93 4.824-10.75 10.756-10.75S26.75 9.07 26.75 15 21.938 24.75 16.006 24.75Zm5.65-7.352c-.31-.155-1.833-.905-2.117-1.008-.284-.104-.492-.155-.699.155-.207.31-.802 1.008-.983 1.215-.181.207-.362.233-.672.078-.31-.155-1.31-.483-2.495-1.539-.922-.822-1.545-1.837-1.726-2.147-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.181.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.699-1.684-.958-2.307-.252-.606-.508-.524-.699-.534l-.596-.01c-.207 0-.543.078-.827.388-.284.31-1.086 1.061-1.086 2.588 0 1.527 1.112 3.003 1.267 3.21.155.207 2.19 3.345 5.309 4.69.742.32 1.32.512 1.771.655.744.237 1.421.203 1.956.123.597-.089 1.833-.75 2.09-1.474.259-.723.259-1.343.181-1.474-.078-.13-.284-.207-.594-.362Z" />
      </svg>
    </a>
  );
}