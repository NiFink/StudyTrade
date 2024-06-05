interface YourProductProps {
    homepageClick?: () => void;
}

function YourProduct({ homepageClick }: YourProductProps) {
    return (
    <>{/* product-grids */}
      <div className="mt-40 px-4 lg:px-32 flex flex-wrap gap-4">
        <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-bag-plus text-black text-[55px]"></i>
          <span className="text-black font-bold text-[23px] ml-2 mt-3">
            Your products:
          </span>
        </div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg flex justify-center items-center">
          <i className="bi bi-plus text-black text-[100px]"></i>
        </div>
      </div>
    </>
    );
}
export default YourProduct;