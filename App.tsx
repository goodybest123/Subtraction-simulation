import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
type Item = {
  id: number;
};

// --- ICON COMPONENTS (Replaces lucide-react) ---
interface IconProps {
  size?: number;
  className?: string;
}

const PlusIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const MinusIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
  </svg>
);

const RotateCcwIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const SparklesIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.9 4.2-4.3.4 3.3 2.9-.6 4.2 3.5-2.4 3.5 2.4-.6-4.2 3.3-2.9-4.3-.4Z" />
    <path d="M5 10.5 3.1 15 5 19.5" />
    <path d="M19 10.5 20.9 15 19 19.5" />
  </svg>
);


// --- LEVEL COMPONENTS ---

// Level 1: Visual Counting
interface Level1Props {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}
const Level1: React.FC<Level1Props> = ({ items, setItems }) => {
  const maxItems = 20;

  const addItem = () => {
    if (items.length < maxItems) {
      setItems([...items, { id: Date.now() + Math.random() }]);
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const reset = () => setItems([]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center flex-wrap">
        <button
          onClick={addItem}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 shadow-md text-base"
        >
          <PlusIcon size={20} /> Add Cookie
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 shadow-md"
        >
          <RotateCcwIcon size={20} /> Reset
        </button>
        <div className="ml-4 text-3xl font-bold text-blue-600">
          Count: {items.length}
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 min-h-80">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => removeItem(item.id)}
              className="w-14 h-14 bg-amber-600 rounded-full cursor-pointer hover:bg-red-500 transition-all transform hover:scale-110 flex items-center justify-center text-3xl shadow-md"
              title="Click to remove"
            >
              🍪
            </div>
          ))}
        </div>
      </div>

      <div className="text-gray-600 text-base bg-blue-50 p-4 rounded-md">
        <strong>How to use:</strong> Click "Add Cookie" to add cookies. Click any cookie to eat it (remove). Watch the count change!
      </div>
    </div>
  );
};

// Level 2: Number Line
const Level2: React.FC = () => {
  const [position, setPosition] = useState(10);
  const maxPosition = 20;

  const jump = (direction: 'forward' | 'backward') => {
    if (direction === 'forward' && position < maxPosition) {
      setPosition(position + 1);
    } else if (direction === 'backward' && position > 0) {
      setPosition(position - 1);
    }
  };

  const jumpMultiple = (direction: 'forward' | 'backward', amount: number) => {
    if (direction === 'forward') {
      setPosition(Math.min(maxPosition, position + amount));
    } else {
      setPosition(Math.max(0, position - amount));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-3 items-center flex-wrap">
        <button
          onClick={() => jump('backward')}
          className="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
        >
          ← Jump Back 1
        </button>
        <button
          onClick={() => jumpMultiple('backward', 5)}
          className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md"
        >
          ← Jump Back 5
        </button>
        <button
          onClick={() => jump('forward')}
          className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
        >
          Jump Forward 1 →
        </button>
        <button
          onClick={() => jumpMultiple('forward', 5)}
          className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
        >
          Jump Forward 5 →
        </button>
        <button
          onClick={() => setPosition(10)}
          className="px-5 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-md"
        >
          <RotateCcwIcon size={20} />
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-10">
        <div className="flex justify-between text-base font-semibold text-gray-700">
          {[...Array(maxPosition + 1)].map((_, i) => (
            <span key={i} className="w-10 text-center">{i}</span>
          ))}
        </div>
        <div className="relative h-12 mt-2">
            <div className="absolute top-1/2 w-full h-0.5 bg-gray-300"></div>
            <div 
              className="absolute top-0 h-full w-12 transition-all duration-500 ease-out flex items-center justify-center"
              style={{ left: `${(position / maxPosition) * 100}%`, transform: 'translateX(-50%)' }}
            >
                <span className="text-5xl">🐸</span>
            </div>
        </div>
        
        <div className="mt-10 text-center">
          <div className="text-5xl font-bold text-purple-600">
            Position: {position}
          </div>
        </div>
      </div>

      <div className="text-gray-600 text-base bg-blue-50 p-4 rounded-md">
        <strong>How to use:</strong> Move the frog forward or backward along the number line. Watch how subtraction means moving backward!
      </div>
    </div>
  );
};

// Level 3: Place Value (No Regrouping)
interface Level3Props {
    tens: Item[];
    setTens: React.Dispatch<React.SetStateAction<Item[]>>;
    ones: Item[];
    setOnes: React.Dispatch<React.SetStateAction<Item[]>>;
    showWork: boolean;
}
const Level3: React.FC<Level3Props> = ({ tens, setTens, ones, setOnes, showWork }) => {
  const addTen = () => {
    if (tens.length < 9) {
      setTens([...tens, { id: Date.now() + Math.random() }]);
    }
  };

  const removeTen = () => {
    if (tens.length > 0) {
      setTens(tens.slice(0, -1));
    }
  };

  const addOne = () => {
    if (ones.length < 9) {
      setOnes([...ones, { id: Date.now() + Math.random() }]);
    }
  };

  const removeOne = () => {
    if (ones.length > 0) {
      setOnes(ones.slice(0, -1));
    }
  };

  const reset = () => {
    setTens([]);
    setOnes([]);
  };

  const total = tens.length * 10 + ones.length;

  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex gap-2">
          <button onClick={addTen} className="px-4 py-2.5 text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md flex items-center gap-2"><PlusIcon size={18} /> Ten</button>
          <button onClick={removeTen} className="px-4 py-2.5 text-base bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md flex items-center gap-2"><MinusIcon size={18} /> Ten</button>
        </div>
        <div className="flex gap-2">
          <button onClick={addOne} className="px-4 py-2.5 text-base bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2"><PlusIcon size={18} /> One</button>
          <button onClick={removeOne} className="px-4 py-2.5 text-base bg-green-700 text-white rounded-lg hover:bg-green-800 shadow-md flex items-center gap-2"><MinusIcon size={18} /> One</button>
        </div>
        <button onClick={reset} className="px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-md"><RotateCcwIcon size={18} /></button>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-center mb-3 text-lg font-bold text-blue-700">TENS (10s)</div>
            <div className="bg-white rounded-lg p-4 min-h-60 border-2 border-blue-300">
              <div className="grid grid-cols-3 gap-2">
                {tens.map((ten) => (
                  <div key={ten.id} className="bg-blue-500 rounded p-2 h-28 flex items-center justify-center shadow-inner">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(10)].map((_, i) => <div key={i} className="w-2.5 h-2.5 bg-white rounded-full"></div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-3 text-2xl font-bold text-blue-600">{tens.length} × 10 = {tens.length * 10}</div>
          </div>

          <div>
            <div className="text-center mb-3 text-lg font-bold text-green-700">ONES (1s)</div>
            <div className="bg-white rounded-lg p-4 min-h-60 border-2 border-green-300">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {ones.map((one) => <div key={one.id} className="w-10 h-10 bg-green-500 rounded shadow-inner"></div>)}
              </div>
            </div>
            <div className="text-center mt-3 text-2xl font-bold text-green-600">{ones.length} × 1 = {ones.length}</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="text-5xl font-bold text-purple-600">Total: {total}</div>
          {showWork && <div className="mt-3 text-2xl text-gray-700">{tens.length * 10} + {ones.length} = {total}</div>}
        </div>
      </div>
      <div className="text-gray-600 text-base bg-blue-50 p-4 rounded-md">
        <strong>How to use:</strong> Add tens and ones separately. See how place value works! Tens are worth 10, ones are worth 1.
      </div>
    </div>
  );
};

// Level 4: Regrouping
interface Level4Props {
    tens: Item[];
    setTens: React.Dispatch<React.SetStateAction<Item[]>>;
    ones: Item[];
    setOnes: React.Dispatch<React.SetStateAction<Item[]>>;
}
const Level4: React.FC<Level4Props> = ({ tens, setTens, ones, setOnes }) => {
  const [breaking, setBreaking] = useState(false);

  const addTen = () => { if (tens.length < 9) setTens([...tens, { id: Date.now() + Math.random() }]); };
  const addOne = () => { if (ones.length < 20) setOnes([...ones, { id: Date.now() + Math.random() }]); };
  const removeOne = () => { if (ones.length > 0) setOnes(ones.slice(0, -1)); };
  const removeTen = () => { if (tens.length > 0) setTens(tens.slice(0, -1)); };
  const reset = () => { setTens([]); setOnes([]); };

  const breakTen = () => {
    if (tens.length > 0 && !breaking) {
      setBreaking(true);
      setTimeout(() => {
        setTens(tens.slice(0, -1));
        const newOnes = [...Array(10)].map(() => ({ id: Date.now() + Math.random() }));
        setOnes(currentOnes => [...currentOnes, ...newOnes]);
        setBreaking(false);
      }, 600);
    }
  };

  const total = tens.length * 10 + ones.length;

  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap items-center">
        {/* Action Buttons */}
        <button onClick={addTen} className="px-4 py-2.5 text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md flex items-center gap-2"><PlusIcon size={18} /> Ten</button>
        <button onClick={removeTen} className="px-4 py-2.5 text-base bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md flex items-center gap-2"><MinusIcon size={18} /> Ten</button>
        <button onClick={addOne} className="px-4 py-2.5 text-base bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2"><PlusIcon size={18} /> One</button>
        <button onClick={removeOne} className="px-4 py-2.5 text-base bg-green-700 text-white rounded-lg hover:bg-green-800 shadow-md flex items-center gap-2"><MinusIcon size={18} /> One</button>
        <button onClick={breakTen} disabled={tens.length === 0 || breaking} className="px-4 py-2.5 text-base bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"><SparklesIcon size={18} /> Break 1 Ten</button>
        <button onClick={reset} className="px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-md"><RotateCcwIcon size={18} /></button>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tens Column */}
          <div>
            <div className="text-center mb-3 text-lg font-bold text-blue-700">TENS (10s)</div>
            <div className="bg-white rounded-lg p-4 min-h-60 border-2 border-blue-300 relative">
              {breaking && <div className="absolute inset-0 bg-yellow-200 opacity-50 animate-pulse rounded-lg z-10"></div>}
              <div className="grid grid-cols-3 gap-2">
                {tens.map((ten, idx) => (
                  <div key={ten.id} className={`bg-blue-500 rounded p-2 h-28 flex items-center justify-center transition-all ${breaking && idx === tens.length - 1 ? 'animate-bounce scale-110' : ''}`}>
                    <div className="grid grid-cols-2 gap-1">{[...Array(10)].map((_, i) => <div key={i} className="w-2.5 h-2.5 bg-white rounded-full"></div>)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-3 text-2xl font-bold text-blue-600">{tens.length} × 10 = {tens.length * 10}</div>
          </div>
          {/* Ones Column */}
          <div>
            <div className="text-center mb-3 text-lg font-bold text-green-700">ONES (1s)</div>
            <div className="bg-white rounded-lg p-4 min-h-60 border-2 border-green-300 overflow-auto max-h-72">
              <div className="grid grid-cols-5 gap-2">
                {ones.map((one, idx) => <div key={one.id} className={`w-10 h-10 bg-green-500 rounded transition-all ${breaking && idx >= ones.length - 10 ? 'animate-pulse' : ''}`}></div>)}
              </div>
            </div>
            <div className="text-center mt-3 text-2xl font-bold text-green-600">{ones.length} × 1 = {ones.length}</div>
          </div>
        </div>

        <div className="mt-8 text-center"><div className="text-5xl font-bold text-purple-600">Total: {total}</div></div>
      </div>

      <div className="text-gray-600 text-base bg-purple-50 p-4 rounded-md">
        <strong>How to use:</strong> This is REGROUPING! When you don't have enough ones to subtract, break a ten into 10 ones. Try it: Add 3 tens and 2 ones (32), then break 1 ten. Now you have 2 tens and 12 ones - still 32!
      </div>
    </div>
  );
};

// Level 5: Three-digit with regrouping
interface Level5Props {
    hundreds: Item[];
    setHundreds: React.Dispatch<React.SetStateAction<Item[]>>;
    tens: Item[];
    setTens: React.Dispatch<React.SetStateAction<Item[]>>;
    ones: Item[];
    setOnes: React.Dispatch<React.SetStateAction<Item[]>>;
    showWork: boolean;
}
const Level5: React.FC<Level5Props> = ({ hundreds, setHundreds, tens, setTens, ones, setOnes, showWork }) => {
    const [breaking, setBreaking] = useState<null | 'hundred' | 'ten'>(null);

    const addHundred = () => { if (hundreds.length < 9) setHundreds([...hundreds, { id: Date.now() + Math.random() }]); };
    const addTen = () => { if (tens.length < 20) setTens([...tens, { id: Date.now() + Math.random() }]); };
    const addOne = () => { if (ones.length < 20) setOnes([...ones, { id: Date.now() + Math.random() }]); };
    const removeHundred = () => hundreds.length > 0 && setHundreds(hundreds.slice(0, -1));
    const removeTen = () => tens.length > 0 && setTens(tens.slice(0, -1));
    const removeOne = () => ones.length > 0 && setOnes(ones.slice(0, -1));

    const reset = () => {
        setHundreds([]);
        setTens([]);
        setOnes([]);
    };

    const breakHundred = () => {
        if (hundreds.length > 0 && !breaking) {
            setBreaking('hundred');
            setTimeout(() => {
                setHundreds(h => h.slice(0, -1));
                const newTens = [...Array(10)].map(() => ({ id: Date.now() + Math.random() }));
                setTens(t => [...t, ...newTens]);
                setBreaking(null);
            }, 600);
        }
    };

    const breakTen = () => {
        if (tens.length > 0 && !breaking) {
            setBreaking('ten');
            setTimeout(() => {
                setTens(t => t.slice(0, -1));
                const newOnes = [...Array(10)].map(() => ({ id: Date.now() + Math.random() }));
                setOnes(o => [...o, ...newOnes]);
                setBreaking(null);
            }, 600);
        }
    };

    const total = hundreds.length * 100 + tens.length * 10 + ones.length;

    return (
        <div className="space-y-6">
            <div className="flex gap-2 flex-wrap items-center text-base">
                <div className="flex gap-1"><button onClick={addHundred} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md">+100</button><button onClick={removeHundred} className="px-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 shadow-md">-100</button></div>
                <div className="flex gap-1"><button onClick={addTen} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">+10</button><button onClick={removeTen} className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md">-10</button></div>
                <div className="flex gap-1"><button onClick={addOne} className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md">+1</button><button onClick={removeOne} className="px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 shadow-md">-1</button></div>
                <button onClick={breakHundred} disabled={hundreds.length === 0 || !!breaking} className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 shadow-md">Break 100→10 Tens</button>
                <button onClick={breakTen} disabled={tens.length === 0 || !!breaking} className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 shadow-md">Break 10→10 Ones</button>
                <button onClick={reset} className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-md"><RotateCcwIcon size={16} /></button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="text-center mb-2 font-bold text-red-700">HUNDREDS</div>
                        <div className="bg-white rounded p-2 min-h-36 border-2 border-red-300 overflow-auto max-h-48"><div className="grid grid-cols-2 gap-1">{hundreds.map((h, idx) => (<div key={h.id} className={`bg-red-500 rounded p-1 h-20 flex items-center justify-center ${breaking === 'hundred' && idx === hundreds.length - 1 ? 'animate-bounce' : ''}`}><div className="grid grid-cols-5 gap-0.5">{[...Array(25)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>))}</div></div>))}</div></div>
                        <div className="text-center mt-2 font-bold text-red-600 text-lg">{hundreds.length * 100}</div>
                    </div>
                    <div>
                        <div className="text-center mb-2 font-bold text-blue-700">TENS</div>
                        <div className="bg-white rounded p-2 min-h-36 border-2 border-blue-300 overflow-auto max-h-48"><div className="grid grid-cols-2 gap-1">{tens.map((t, idx) => (<div key={t.id} className={`bg-blue-500 rounded p-1 h-16 flex items-center justify-center ${breaking === 'ten' && idx === tens.length - 1 ? 'animate-bounce' : ''}`}><div className="grid grid-cols-2 gap-0.5">{[...Array(10)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>))}</div></div>))}</div></div>
                        <div className="text-center mt-2 font-bold text-blue-600 text-lg">{tens.length * 10}</div>
                    </div>
                    <div>
                        <div className="text-center mb-2 font-bold text-green-700">ONES</div>
                        <div className="bg-white rounded p-2 min-h-36 border-2 border-green-300 overflow-auto max-h-48"><div className="grid grid-cols-4 gap-1.5">{ones.map((o) => (<div key={o.id} className="w-5 h-5 bg-green-500 rounded"></div>))}</div></div>
                        <div className="text-center mt-2 font-bold text-green-600 text-lg">{ones.length}</div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="text-4xl font-bold text-orange-600">Total: {total}</div>
                    {showWork && (<div className="mt-2 text-xl text-gray-700">{hundreds.length * 100} + {tens.length * 10} + {ones.length} = {total}</div>)}
                </div>
            </div>

            <div className="text-gray-600 text-sm bg-orange-50 p-3 rounded-md">
                <strong>Advanced:</strong> Work with hundreds! Break hundreds into tens, and tens into ones. Try making 456 and practice regrouping.
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [tens, setTens] = useState<Item[]>([]);
  const [ones, setOnes] = useState<Item[]>([]);
  const [hundreds, setHundreds] = useState<Item[]>([]);
  const [showWork, setShowWork] = useState(false);

  const levels = [
    { id: 1, name: 'Visual Counting' },
    { id: 2, name: 'Number Line' },
    { id: 3, name: 'Place Value' },
    { id: 4, name: 'Regrouping' },
    { id: 5, name: 'Three Digits' }
  ];

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    setItems([]);
    setTens([]);
    setOnes([]);
    setHundreds([]);
  }

  const renderLevel = () => {
    switch (level) {
      case 1: return <Level1 items={items} setItems={setItems} />;
      case 2: return <Level2 />;
      case 3: return <Level3 tens={tens} setTens={setTens} ones={ones} setOnes={setOnes} showWork={showWork} />;
      case 4: return <Level4 tens={tens} setTens={setTens} ones={ones} setOnes={setOnes} />;
      case 5: return <Level5 hundreds={hundreds} setHundreds={setHundreds} tens={tens} setTens={setTens} ones={ones} setOnes={setOnes} showWork={showWork} />;
      default: return <Level1 items={items} setItems={setItems} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen font-sans flex items-center justify-center p-4 md:p-8">
        <div className="max-w-7xl w-full mx-auto p-8 bg-white rounded-2xl shadow-2xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Subtraction Simulation</h1>
                <p className="text-lg text-gray-600">Explore subtraction concepts through hands-on experimentation</p>
            </div>

            <div className="mb-8 flex gap-3 flex-wrap items-center">
                {levels.map((l) => (
                <button
                    key={l.id}
                    onClick={() => handleLevelChange(l.id)}
                    className={`px-6 py-3 text-base rounded-lg font-medium transition-all ${
                    level === l.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                    Level {l.id}: {l.name}
                </button>
                ))}

                <button
                    onClick={() => setShowWork(!showWork)}
                    className="ml-auto px-6 py-3 text-base bg-slate-700 text-white rounded-lg hover:bg-slate-800 shadow-md"
                >
                {showWork ? 'Hide' : 'Show'} Math
                </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 shadow-inner">
                {renderLevel()}
            </div>
        </div>
    </div>
  );
};

export default App;
