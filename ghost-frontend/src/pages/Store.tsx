import { VisitorsNavBar } from "../components/VisitorsNavBar";

export default function Store() {
    const items = [
        {
            id: 1,
            name: "Logitech G Pro X Gaming Headset",
            price: "$129.99",
            image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/10/Logitech-G-Pro-X-Wireless-Gaming-Headset-Amazon-1.jpg",
            link: "https://amazon.com", // placeholder affiliate link
        },
        {
            id: 2,
            name: "Xbox Elite Wireless Controller Series 2",
            price: "$179.99",
            image: "https://assets.xboxservices.com/assets/57/a6/57a6f2f8-4978-495a-acf1-4a0878ae4861.jpg?n=999666_Custom-Hero-1400_1920x1237.jpg",
            link: "https://amazon.com",
        },
        {
            id: 3,
            name: "Razer BlackWidow V3 Mechanical Keyboard",
            price: "$139.99",
            image: "https://assets2.razerzone.com/images/pnx.assets/9a4267d1a3614ac6bbc05bf89e706b3b/razer-blackwidow-v3-pro-usp01-mobile.jpg",
            link: "https://amazon.com",
        },
        {
            id: 4,
            name: "Elgato HD60 X Capture Card",
            price: "$199.99",
            image: "https://images.ctfassets.net/h50kqpe25yx1/2QxbnZrVSBQvXew4x3ixWI/34c154b0dc512d61e30241ab91e4f0bf/hd60x.jpg",
            link: "https://amazon.com",
        },
    ];

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            <VisitorsNavBar />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Ghost Store</h1>
                <p className="text-gray-400 mb-10">
                    Browse a selection of gaming gear and gadgets. Purchases are made
                    through trusted partners.
                </p>

                {/* Store Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#0E1115] rounded-lg shadow-md overflow-hidden flex flex-col"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                                <p className="text-gray-400 text-sm mb-3">{item.price}</p>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
                                >
                                    Buy Now →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}