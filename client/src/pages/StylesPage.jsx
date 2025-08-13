import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const StylesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const styles = [
    // Animation Styles
    { 
      name: 'Pixar Animation', 
      category: 'animation',
      description: 'Colorful 3D animation style with rounded features and expressive eyes',
      example: '/images/pixar-animation-example.png',
      popularity: 5
    },
    { 
      name: 'Disney Animation', 
      category: 'animation',
      description: 'Classic Disney character style with vibrant colors and magical elements',
      example: '/images/disney-animation-example.png',
      popularity: 5
    },
    { 
      name: 'Studio Ghibli Animation', 
      category: 'animation',
      description: 'Dreamy, hand-drawn style inspired by Miyazaki films',
      example: '/images/studio-ghibli-animation-example.png',
      popularity: 4
    },
    { 
      name: 'DreamWorks Animation Style', 
      category: 'animation',
      description: 'Bold, expressive 3D animation with dynamic poses',
      example: '/images/dreamworks-animation-example.png',
      popularity: 3
    },
    { 
      name: 'Looney Tunes / Classic Cartoon', 
      category: 'animation',
      description: 'Vintage cartoon style with exaggerated features and bold outlines',
      example: '/images/looney-tunes-example.png',
      popularity: 3
    },
    { 
      name: 'Scooby-Doo Mystery Ink Style', 
      category: 'animation',
      description: 'Retro 70s cartoon aesthetic with bright colors',
      example: '/images/scooby-doo-example.png',
      popularity: 2
    },
    { 
      name: 'Rick & Morty / Adult Swim Style', 
      category: 'animation',
      description: 'Quirky, irreverent animation style with unique character design',
      example: '/images/rick-morty-example.png',
      popularity: 3
    },
    { 
      name: 'Simpsons Style', 
      category: 'animation',
      description: 'Iconic yellow-skinned cartoon style with simple shapes',
      example: '/images/simpsons-style-example.png',
      popularity: 4
    },
    { 
      name: '1930s Vintage Animation (Steamboat Willie)', 
      category: 'animation',
      description: 'Classic black and white animation style from the golden age',
      example: '/images/1930s-animation-example.png',
      popularity: 2
    },
    { 
      name: 'Anime Portrait', 
      category: 'animation',
      description: 'Japanese anime style with large eyes and detailed expressions',
      example: '/images/anime-portrait-example.png',
      popularity: 4
    },

    // Traditional & Fine Art
    { 
      name: 'Watercolor Painting', 
      category: 'traditional',
      description: 'Soft, flowing watercolor technique with gentle color bleeding',
      example: '/images/watercolor-painting-example.png',
      popularity: 5
    },
    { 
      name: 'Oil Painting', 
      category: 'traditional',
      description: 'Rich, textured oil paint style with deep colors and classical feel',
      example: '/images/oil-painting-example.png',
      popularity: 4
    },
    { 
      name: 'Pencil Sketch', 
      category: 'traditional',
      description: 'Detailed graphite pencil drawing with realistic shading',
      example: '/images/pencil-sketch-example.png',
      popularity: 3
    },
    { 
      name: 'Charcoal Drawing', 
      category: 'traditional',
      description: 'Dramatic black and white charcoal artwork with bold contrasts',
      example: '/images/charcoal-drawing-example.png',
      popularity: 3
    },
    { 
      name: 'Pastel Chalk Portrait', 
      category: 'traditional',
      description: 'Soft pastel colors with a dreamy, artistic finish',
      example: '/images/pastel-chalk-example.png',
      popularity: 3
    },
    { 
      name: 'Ink & Wash', 
      category: 'traditional',
      description: 'Traditional East Asian brush painting technique',
      example: '/images/ink-wash-example.png',
      popularity: 2
    },
    { 
      name: 'Gouache Painting', 
      category: 'traditional',
      description: 'Opaque watercolor with vibrant, matte finish',
      example: '/images/gouache-painting-example.png',
      popularity: 2
    },
    { 
      name: 'Impressionist Painting (Monet-style)', 
      category: 'traditional',
      description: 'Loose brushstrokes and light-focused impressionist technique',
      example: '/images/impressionist-painting-example.png',
      popularity: 3
    },

    // Modern Digital Styles
    { 
      name: 'Comic Book Art', 
      category: 'digital',
      description: 'Bold comic book style with dramatic lighting and action poses',
      example: '/images/comic-book-art-example.png',
      popularity: 4
    },
    { 
      name: 'Vector Art / Flat Illustration', 
      category: 'digital',
      description: 'Clean, geometric vector style with flat colors',
      example: '/images/vector-art-example.png',
      popularity: 3
    },
    { 
      name: 'Pixel Art (8-bit / 16-bit)', 
      category: 'digital',
      description: 'Retro video game pixel art style',
      example: '/images/pixel-art-example.png',
      popularity: 2
    },
    { 
      name: '3D Sculpt / Claymation Look', 
      category: 'digital',
      description: 'Three-dimensional sculpted appearance with texture details',
      example: '/images/3d-sculpt-example.png',
      popularity: 2
    },

    // Fantasy & Sci-Fi
    { 
      name: 'Fantasy Art', 
      category: 'fantasy',
      description: 'Magical fantasy style with mythical elements and rich details',
      example: '/images/fantasy-art-example.png',
      popularity: 4
    },
    { 
      name: 'Cyberpunk City', 
      category: 'fantasy',
      description: 'Futuristic neon-lit cyberpunk aesthetic with urban elements',
      example: '/images/cyberpunk-city-example.png',
      popularity: 3
    },
    { 
      name: 'Renaissance Portrait', 
      category: 'traditional',
      description: 'Classical Renaissance painting style with rich colors and masterful technique',
      example: '/images/renaissance-portrait-example.png',
      popularity: 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Styles', count: styles.length },
    { id: 'animation', name: 'Animation', count: styles.filter(s => s.category === 'animation').length },
    { id: 'traditional', name: 'Traditional Art', count: styles.filter(s => s.category === 'traditional').length },
    { id: 'digital', name: 'Digital Art', count: styles.filter(s => s.category === 'digital').length },
    { id: 'fantasy', name: 'Fantasy & Sci-Fi', count: styles.filter(s => s.category === 'fantasy').length }
  ];

  const filteredStyles = selectedCategory === 'all' 
    ? styles 
    : styles.filter(style => style.category === selectedCategory);

  const popularStyles = styles.filter(style => style.popularity >= 4).slice(0, 6);

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Art Gallery"
          title="Explore 25+ Artistic Styles"
          subtitle="From classic animation to fine art paintings, discover the perfect style to transform your pet into a masterpiece"
        />

        {/* Popular Styles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Most Popular Styles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularStyles.map((style, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {style.example ? (
                    <img 
                      src={style.example} 
                      alt={`${style.name} example`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="text-4xl">🎨</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{style.name}</h4>
                  <p className="text-slate-600 text-sm mb-4">{style.description}</p>
                  <Button as={Link} to="/create" size="sm" className="w-full">
                    Try This Style
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* All Styles Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {selectedCategory === 'all' ? 'All Styles' : categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStyles.map((style, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {style.example ? (
                    <img 
                      src={style.example} 
                      alt={`${style.name} example`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="text-3xl">🎨</span>
                    </div>
                  )}
                  {style.popularity >= 4 && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ★
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 mb-2">{style.name}</h4>
                  <p className="text-slate-600 text-xs mb-3 line-clamp-2">{style.description}</p>
                  <Button as={Link} to="/create" size="sm" variant="secondary" className="w-full text-xs">
                    Use Style
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Styles CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Don't See What You Want?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Use our Custom Scene feature to describe exactly what you envision. 
            From "my dog as a superhero" to "my cat in a medieval castle" - the possibilities are endless!
          </p>
          <Button as={Link} to="/create" size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-50">
            Create Custom Scene
          </Button>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Tips for Best Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Clear Photos</h4>
              <p className="text-slate-600 text-sm">Use well-lit, high-quality photos where your pet's face is clearly visible for the best AI results.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Style Matching</h4>
              <p className="text-slate-600 text-sm">Consider your pet's personality when choosing a style. Bold pets work great with comic book styles!</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Experiment</h4>
              <p className="text-slate-600 text-sm">Try multiple styles with the same photo to see different artistic interpretations of your pet.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StylesPage;
