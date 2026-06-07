import { useEffect, useState } from 'react';
import type { GachaModalProps } from '../props/GachaModalProps';
import { getUserPullHistory, item3Stars, item4Stars, item5Stars, itemDatabase } from '../services/ItemServices';
import { backgroundRarityColors, outlineRarityColors, type ItemData } from '../types/ItemData';

interface PullHistoryData{
  itemId: string,
  bannerId: string,
  timestamp: string, 
}

// interface IPullHistory{
//   pullHistory: PullHistoryData[],
//   totalPages: string
// }

const GachaModal = ({ modalType, extMessage, onClose, items }: GachaModalProps) => {
  // const [message, setMessage] = useState('');
  const [history, setHistory] = useState<PullHistoryData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (modalType !== 'pull history') return;
    const getPullHistory = async () => {
      const response = await getUserPullHistory(page);

      console.log(response);
      setHistory(response.pullHistory);
      setTotalPages(response.totalPages);
    }
    
    getPullHistory();
  }, [modalType, page])

  const displayItems = (min_idx : number, max_idx : number) => {
    // 1. Grab only the items that exist within this row's bounds
  const rowItems = items.slice(min_idx, max_idx + 1);

  // 2. Map over them. If rowItems is empty (e.g., items 5-9 don't exist yet), 
  // it naturally returns nothing for this row without breaking.
    return (
      <>
        {rowItems.map((itemId, idx) => {
          const itemData: ItemData = itemDatabase[itemId];
          
          // Safety check in case the database doesn't have the ID
          if (!itemData) return null; 

          return (
            <div 
              key={idx} 
              className={`w-48 h-48 outline-4 flex items-center justify-center ${outlineRarityColors[itemData.rarity]}`}
            >
              <img className="aspect-auto" src={itemData.iconPath} alt={itemData.itemId} />
            </div>
          );
        })}
      </>
    )
  }

  if (modalType === null) return;

  return (
      <div>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-grayscale-25">
      
        {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-full p-4 relative">
            {/* Close Button */}
            <button 
              onClick={() => {
                if (modalType === 'pull history') setPage(1);
                onClose();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* PULL */}
            {modalType === 'pull' &&
              <>
                <div className="w-full flex justify-center p-3 text-2xl">
                You win!
                </div>
                {/* {message} */}
                <div className="flex flex-row justify-center pb-3 gap-4">
                  {displayItems(0, 4)}
                </div>
                <div className="flex flex-row justify-center pb-3 gap-4">
                  {displayItems(5, 9)}
                </div>
              </>
            }

            {/* ERROR */}
            {modalType === 'error' &&
              <>
                <br/>
                {extMessage}
              </>
            }

            {/* RATES */}
            {modalType === 'rates' &&
              <>
                Rates<br/>
                <div className='overflow-y-auto max-h-[65vh]'>
                  <h2 className='text-2xl'>Chances</h2>
                  <hr/>
                  1.0% Chance to Win 5-STAR<br/>
                  6.5% Chance to Win 4-STAR<br/>
                  92.5% Chance to Win 3-STAR<br/>
                  <h2 className='text-2xl'>How Pity System Works</h2>
                  <hr/>
                  <b>5-STAR PITY: </b>Every 50 pulls, the user is guaranteed to get a 5-STAR Item from the selection. Whenever the user does not get a 5-STAR Item, it will count<br/>
                  to the 5-STAR counter, but if the user managed to pull a 5-STAR Item, the 5-STAR counter will reset to 0.<br/>
                  <b>4-STAR PITY: </b>Every 10 pulls, the user is guaranteed to get a 4-STAR Item from the selection. Whenever the user does not get a 4-STAR Item, it will count<br/>
                  to the 4-STAR counter, but if the user managed to pull a 4-STAR Item, the 4-STAR counter will reset to 0.<br/>
                  <h2 className='text-2xl'>Items</h2>
                  <hr/>
                  <div className="w-full my-6 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    <div className='p-4 flex justify-center bg-amber-200'>
                      5 Star Items
                    </div>
                    
                    <hr/>
                    <table className="w-full text-left border-collapse">
                      <tbody className=" bg-white">
                        {item5Stars.map((row, index) => (
                          <tr key={index} 
                            className="hover:bg-slate-50/70 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm w-1/2 font-medium text-center text-slate-900 align-top">
                              {row.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full my-6 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    <div className='p-4 flex justify-center bg-purple-200'>
                      4 Star Items
                    </div>
                    
                    <hr/>
                    <table className="w-full text-left border-collapse">
                      <tbody className=" bg-white">
                        {item4Stars.map((row, index) => (
                          <tr key={index} 
                            className="hover:bg-slate-50/70 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm w-1/2 font-medium text-center text-slate-900 align-top">
                              {row.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full my-6 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    <div className='p-4 flex justify-center bg-blue-200'>
                      3 Star Items
                    </div>
                    
                    <hr/>
                    <table className="w-full text-left border-collapse">
                      <tbody className=" bg-white">
                        {item3Stars.map((row, index) => (
                          <tr key={index} 
                            className="hover:bg-slate-50/70 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm w-1/2 font-medium text-center text-slate-900 align-top">
                              {row.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            }

            {/* PULL HISTORY */}
            {modalType === 'pull history' &&
              <>
                Pull History<br/>
                <div className="w-200 max-w-2xl mx-auto my-6 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-sm font-semibold text-center text-slate-700 tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-center text-slate-700 tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-white">
                    {history.map((row, index) => (
                      <tr 
                        key={index} 
                        className={`hover:bg-slate-50/70 transition-colors duration-200 ${backgroundRarityColors[itemDatabase[row.itemId].rarity]}`}
                      >
                        <td className="px-6 py-4 text-sm w-1/2 font-medium text-center text-slate-900 align-top">
                          {itemDatabase[row.itemId].name}
                        </td>
                        <td className="px-6 py-4 text-sm w-1/2 text-slate-600 text-center leading-relaxed">
                          {row.timestamp ? (() => {
                            const d = new Date(row.timestamp);

                            const ld = d.toLocaleString(undefined, {
                              year: '2-digit',    // "YY"
                              month: '2-digit',   // "MM"
                              day: '2-digit',     // "DD"
                              hour: '2-digit',    // "hh"
                              minute: '2-digit',  // "mm"
                              second: '2-digit',  // "ss"
                              hour12: true
                            })
                            return `${ld}`;
                          })() : 'Loading...'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              <div className="flex flex-row w-full justify-between min-h-12">
                <div className="flex w-full h-full">
                  <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                    Previous
                  </button>
                </div>
                <div className="h-full min-h-12 flex flex-row w-1/3 justify-center">
                  <div className="h-full min-h-12 flex flex-col justify-center">{page}/{totalPages}</div>
                </div>
                <div className="flex justify-end w-full h-full">
                  <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
              </>
            }
          </div>
        </div>

      </div>
  );
};

export default GachaModal;