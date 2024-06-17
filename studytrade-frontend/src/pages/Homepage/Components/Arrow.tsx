interface ArrowProps {
  arrowClick?: () => void;
  scrollToShopbar: () => void;
}
{
  /* displays a arrow as a button to jump down to the shop bar with a backgroundimage */
}
function Arrow({ arrowClick }: ArrowProps) {
  return (
    <div className="relative flex flex-col items-center justify-center top-24 h-screen overflow-hidden z-0">
      <img
        src="./images/building10.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30"></div>
      <div className="text-9xl mb-14 -ml-8 font-semibold relative z-10 text-white">
        StudyTrade
      </div>
      <button
        type="button"
        onClick={arrowClick}
        className="text-black bg-transparent focus:ring-1 focus:outline-none focus:ring-gray-500 rounded-full text-xl p-6 text-center  inline-flex items-center border-4 border-white w-32 h-32 relative z-10"
      >
        <svg
          className="w-24 h-24 bi bi-arrow-down"
          aria-hidden="true"
          fill="none"
          viewBox="-1.6 2 13 10"
        >
          <path
            stroke="white "
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M5 1v12L1 9m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}

export default Arrow;
