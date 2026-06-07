import { useEffect, useState, type JSX } from "react";
import { type ItemData } from "../types/ItemData";
import { GachaPortrait, getUserItems, itemDatabase } from "../services/ItemServices";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ENV } from "../helpers/EnvUtils";

interface InventoryItem{
    itemId : string,
    quantity : number,
    _id : string,
}

interface InventoryItemButton{
    itemId: string,
    idx: number
}

type ItemSortType = 'rarity-asc' | 'name-asc' | 'rarity-desc' | 'name-desc';

function Inventory() {
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState<ItemSortType>('rarity-desc');
    const [currentItem, setCurrentItem] = useState<InventoryItemButton | null>();
    const [items, setItems] = useState<InventoryItem[]>([]);
    const { username } = useParams();
    const { user, token, updateUser } = useAuth();
    const [refreshToggle, setRefreshToggle] = useState(false);

    const isOwner = user && user.username.toLowerCase() === username?.toLowerCase();

    useEffect(() => {
        if(!username){
            return
        }
        
        const getItems = async () => {
            try{
                const response = await getUserItems(username);

                setItems(response);
                console.log(response);
            }
            catch(err: any){
                setMessage(err.message);
            }
        }
        
        getItems();

    }, [username, refreshToggle])

    const displayItemDetail = (itemId : string, idx : number) => {
        setCurrentItem({
            itemId: itemId,
            idx: idx
        });
    }

    const displayItems = () => {
        if (items.length === 0) return;
        const elements : JSX.Element[] = []
    
        for (let i = 0; i < sortedAndFilteredItems.length; i++){
          const itemData : ItemData = itemDatabase[sortedAndFilteredItems[i].itemId];
          for (let j = 0; j < sortedAndFilteredItems[i].quantity; j++){
            elements.push(
                <button onClick={() => {displayItemDetail(itemData.itemId, j)}}>
                    <GachaPortrait key={itemData.itemId + ` ${j}`} itemId={itemData.itemId}/>
                </button>
            );
          } 
        }
        return <>{elements}</>
    }

    const filteredItems = items.filter((item) => {
        const searchedQuery = searchQuery.toLowerCase();
        return itemDatabase[item.itemId].name.toLowerCase().includes(searchedQuery);
    })

    const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
        if (sortType === 'name-asc') {
            return itemDatabase[a.itemId].name.localeCompare(itemDatabase[b.itemId].name);
        }
        if (sortType === 'name-desc') {
            return itemDatabase[b.itemId].name.localeCompare(itemDatabase[a.itemId].name);
        }
        if (sortType === 'rarity-desc') {
            return itemDatabase[b.itemId].rarity - itemDatabase[a.itemId].rarity; // Highest rarity first
        }
        if (sortType === 'rarity-asc') {
            return itemDatabase[a.itemId].rarity - itemDatabase[b.itemId].rarity; // Lowest rarity first
        }
        return 0;
    });

    const recycleItem = async () => {
        if (!currentItem) return;

        try{
            const response = await fetch(`${ENV.API_URL}/api/items/recycle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body : JSON.stringify({
                    itemId: currentItem?.itemId
                })
            })

            const data = await response.json();

            updateUser({
                pull_currency_fragment: data.pull_currency_fragment
            })

            console.log(data.message);
            setCurrentItem(null);
            setRefreshToggle(!refreshToggle);
        }
        catch (err: any) {
            console.error(err.message);
        }
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="h-[10vh]">
                    {message}
                </div>
                <div className="md:w-1/5 mx-auto md:ml-5 max-w-50 p-2 my-2 overflow-hidden border border-slate-200 text-center md:text-left rounded-xl shadow-sm">
                    Fragments: {user?.pull_currency_fragment}
                </div>
                <div className="flex flex-col-reverse md:flex-row w-full md:w-auto gap-x-0 md:gap-x-3 gap-y-3 md:gap-y-0 bg-blue-50 p-2 rounded-2xl">
                    
                    
                    {/* INVENTORY */}
                    <div className="bg-blue-400 w-full md:w-150 rounded-2xl mb-3 md:mb-0 p-3 flex flex-col">
                        <div className="pb-2 flex gap-4 w-full">
                            <p className="text-2xl text-white">Inventory</p>
                            <div className="relative mb-6 w-full">
                                <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                                />
                                {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-medium"
                                >
                                    Clear
                                </button>
                                )}
                            </div>
                            <div className="w-40">
                                <select
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value as ItemSortType)}
                                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium cursor-pointer"
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="rarity-desc">Rarity <b>↓</b></option>
                                    <option value="rarity-asc">Rarity <b>↑</b></option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Inventory Body */}
                        <div className="grow pb-2">
                            <div className="w-full bg-blue-800 rounded-2xl grid p-4 overflow-y-auto max-h-[60vh]">
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                    {displayItems()}
                                </div>
                            </div>
                        </div>
                        {/* Inventory Footer */}
                        {isOwner &&
                            <div className="w-full rounded-2xl p-3">
                                
                            </div>
                        }
                    </div>
                    {/* ITEM DETAILS */}
                    <div className="bg-blue-400 w-full md:w-100 rounded-2xl h-full p-3 flex flex-col">
                        {/* Item Details Body */}
                        <div className="grow pb-2">
                            <div className="flex justify-center pb-3">
                                <div className="w-48 h-48 outline-2 flex align-middle justify-center">
                                    {currentItem && 
                                        <>
                                            <img className="aspect-auto" src={itemDatabase[currentItem.itemId].iconPath}/>
                                        </>
                                    }
                                </div>
                            </div>
                            <hr/>
                            <div className="flex flex-col">
                                <div className="p-3 text-2xl text-wrap">
                                    {currentItem && itemDatabase[currentItem.itemId].name}
                                </div>
                                <div>
                                    {currentItem && itemDatabase[currentItem.itemId].description}
                                </div>
                                <br/>
                                <div className="text-sm text-gray-700">
                                    {isOwner && <>{currentItem && `Recycle Fragments: ${itemDatabase[currentItem.itemId].fragments}`}</>}
                                </div>
                            </div>
                            
                        </div>
                        {/* Item Details Footer */}
                        {isOwner &&
                            <div className="flex gap-2 w-full rounded-2xl p-3">
                                <button onClick={recycleItem} className="btn bg-red-500 rounded p-2 pl-5 pr-5 text-white hover:bg-red-700 transition-colors">
                                    Recycle
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Inventory