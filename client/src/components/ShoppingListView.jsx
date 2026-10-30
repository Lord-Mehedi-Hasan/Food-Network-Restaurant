import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Check, 
  Trash2, 
  Plus, 
  Printer, 
  Copy, 
  CheckCheck,
  Sparkles
} from 'lucide-react';
import { useMealPlanShopping } from '../context/MealPlanShoppingContext';

export const ShoppingListView = () => {
  const {
    shoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCompletedShoppingItems,
    addCustomShoppingItem,
  } = useMealPlanShopping();

  const [newItemText, setNewItemText] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const categories = ['Produce', 'Meat & Seafood', 'Dairy', 'Bakery', 'Pantry', 'Spices', 'Beverages'];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addCustomShoppingItem(newItemText, newItemAmount, newItemCategory);
    setNewItemText('');
    setNewItemAmount('');
  };

  const handleCopyList = () => {
    const text = shoppingList
      .map((item) => `[${item.checked ? 'X' : ' '}] ${item.item} (${item.amount || 'as needed'}) - ${item.category}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const completedCount = shoppingList.filter((i) => i.checked).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-1">
            <ShoppingCart className="w-4 h-4" />
            <span>Smart Grocery List</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900">
            Shopping List Builder
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Auto-organized by supermarket aisle. Check off items as you shop in-store or online.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <button
              onClick={clearCompletedShoppingItems}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-red-600 bg-stone-100 hover:bg-red-50 transition-colors"
            >
              Clear {completedCount} Checked
            </button>
          )}

          <button
            onClick={handleCopyList}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white transition-colors"
          >
            {copyFeedback ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy List'}</span>
          </button>
        </div>
      </div>

      {/* Quick Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap sm:flex-nowrap items-center gap-3">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add grocery item (e.g. Heirloom garlic, Organic milk)..."
          className="flex-1 text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-orange-500"
          required
        />
        <input
          type="text"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(e.target.value)}
          placeholder="Amount (e.g. 2 bulbs)"
          className="w-36 text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-orange-500"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          className="text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors flex items-center gap-1 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Aisle Grouped List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catItems = shoppingList.filter((item) => (item.category || 'Produce').toLowerCase() === cat.toLowerCase());
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="font-serif text-sm font-bold text-stone-900">{cat} Aisle</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {catItems.length} items
                </span>
              </div>

              <ul className="space-y-2">
                {catItems.map((item) => (
                  <li
                    key={item.id || item._id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      item.checked
                        ? 'bg-stone-50 border-stone-100 opacity-60'
                        : 'bg-white border-stone-200 hover:border-orange-300'
                    }`}
                  >
                    <div
                      onClick={() => toggleShoppingItem(item.id || item._id)}
                      className="flex items-center gap-2.5 flex-1 cursor-pointer"
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          item.checked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 hover:border-orange-500'
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div>
                        <span className={`text-xs font-bold block ${item.checked ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                          {item.item}
                        </span>
                        {item.amount && (
                          <span className="text-[11px] text-stone-500">{item.amount}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeShoppingItem(item.id || item._id)}
                      className="text-stone-300 hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
