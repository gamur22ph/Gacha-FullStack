import { outlineRarityColors, type ItemData } from "../types/ItemData";
import items from "../data/items.json";
import { ENV } from "../helpers/EnvUtils";

export const itemDatabase : Record<string, ItemData> = items.reduce((map, item) => {
  map[item.itemId] = item as ItemData;
  map[item.itemId].iconPath = new URL("../assets/" + map[item.itemId].iconPath, import.meta.url).href;
  console.log(map[item.itemId].iconPath);
  return map;
}, {} as Record<string, ItemData>);

export const item5Stars = Object.values(itemDatabase).filter((item) => item.rarity === 5);
export const item4Stars = Object.values(itemDatabase).filter((item) => item.rarity === 4);
export const item3Stars = Object.values(itemDatabase).filter((item) => item.rarity === 3);

export const GachaPortrait = ({itemId }: {itemId : string}) =>{
    const itemDetails = itemDatabase[itemId];

    if (!itemDetails) return (<>Loading</>);
    return (
    <div key={itemId} className={`bg-blue-950 w-24 h-24 outline-2 ${outlineRarityColors[itemDetails.rarity]} hover:bg-blue-700 hover:scale-110 transition-colors`}>
      <img src={itemDetails.iconPath} alt={itemDetails.name} className="object-cover"/>
      {/* <h3>{itemDetails.name}</h3> */}
    </div>
  );
}

export const getUserItems = async (username : string) => {
  const response = await fetch(`${ENV.API_URL}/api/items/inventory/${username}`,
    {
      method : 'GET'
    }
  )

  return await response.json();
}

export const getUserPullHistory = async (page : number) => {
  const token = localStorage.getItem('token');
  
  console.log("fetching history");
  const response = await fetch(`${ENV.API_URL}/api/items/history?page=${page}`,
    {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    }
  )
 
  const data = await response.json();

  return data;

}