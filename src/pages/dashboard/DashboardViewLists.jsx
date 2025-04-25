import { useEffect, useState } from 'react';
import { ShoppingListService } from '@/services/shoppingList.service';
import ListCard from "@/components/ListCard";
import LoadingListCard from "@/components/LoadingListCard";

export default function DashboardViewLists() {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const fetchedLists = await ShoppingListService.getListsByUser();
                setLists(fetchedLists);
            } catch (error) {
                console.error("Error fetching lists:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLists();
    }, []);

    return (
        <div className="px-4 pb-4 md:p-6">
            <h1 className="text-3xl text-[var(--white)] mb-6">
                Tus listas
            </h1>

            <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
                md:h-[380px] h-auto overflow-x-hidden overflow-y-auto pr-2">

                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-full flex justify-center">
                            <LoadingListCard />
                        </div>
                    ))
                    : lists.map((list) => {
                        if (!list || !list.products) return null;

                        const productosPreview = list.products.map((p) => ({
                            id: p.productId,
                            name: p.productName,
                            description: p.description,
                            price: p.price,
                            amount: p.amount, // <- para mostrar la cantidad
                        }));

                        return (
                            <div key={list.id} className="h-full flex justify-center">
                                <ListCard
                                    name={list.name}
                                    products={productosPreview}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
