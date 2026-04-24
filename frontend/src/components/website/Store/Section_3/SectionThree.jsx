

import ProductsGrid from "./Products/ProductsGrid";


const SectionThree = ({searchParams}) => {
    
    return (
        <div className="w-full space-y-6">
            <ProductsGrid searchParams={searchParams} />
        </div>
    );
};

export default SectionThree;