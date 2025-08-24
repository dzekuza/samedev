import { GlowCard } from './spotlight-card'

export function GlowCardDemo () {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1 className="text-4xl font-bold text-white mb-8">GlowCard Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl">
        <GlowCard glowColor="blue" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Blue Glow</h3>
            <p className="text-gray-300 text-sm">Interactive hover effect</p>
          </div>
        </GlowCard>

        <GlowCard glowColor="purple" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Purple Glow</h3>
            <p className="text-gray-300 text-sm">Dynamic spotlight effect</p>
          </div>
        </GlowCard>

        <GlowCard glowColor="green" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Green Glow</h3>
            <p className="text-gray-300 text-sm">Smooth animations</p>
          </div>
        </GlowCard>

        <GlowCard glowColor="red" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Red Glow</h3>
            <p className="text-gray-300 text-sm">Glass morphism</p>
          </div>
        </GlowCard>

        <GlowCard glowColor="orange" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Orange Glow</h3>
            <p className="text-gray-300 text-sm">Modern design</p>
          </div>
        </GlowCard>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <GlowCard glowColor="blue" size="sm">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold text-sm">Small Card</h3>
          </div>
        </GlowCard>

        <GlowCard glowColor="purple" size="md">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold">Medium Card</h3>
          </div>
        </GlowCard>

        <GlowCard glowColor="green" size="lg">
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-gradient-to-br from-green-400 to-green-500 rounded-lg mb-4"></div>
            <h3 className="text-white font-semibold text-lg">Large Card</h3>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
