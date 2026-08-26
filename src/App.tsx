import { useState, useEffect } from 'react';
import { TonConnectButton, useTonConnectUI, useTonAddress, THEME } from '@tonconnect/ui-react';
import { 
  Terminal, 
  Bot, 
  ShoppingBag, 
  PlusCircle, 
  User, 
  Zap, 
  UploadCloud, 
  FileCode, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Menu,
  X,
  Sun,
  Moon,
  Edit,
  Trash2
} from 'lucide-react';
import { useMarketplaceContract } from './hooks/useMarketplaceContract';
import { Address } from '@ton/core';
import { Buffer } from 'buffer';

interface Skill {
  id: number;
  name: string;
  price: string;
  category: 'Termux' | 'AI' | 'General';
  icon: React.ReactNode;
  nftAddress: string;
  description: string;
  isUserListed?: boolean;
}

// Helper to generate a valid TON Address
const generateMockAddress = (): string => {
  const hash = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    hash[i] = Math.floor(Math.random() * 256);
  }
  const addr = new Address(0, hash);
  return addr.toString({ bounceable: true, urlSafe: true });
};

const INITIAL_SKILLS: Skill[] = [
  {
    id: 1000,
    name: "actualizar_repo.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQB5MKRVy0si3NXRLhzWAd9lky_o5uQ-lj9US4pIaqMUToSc",
    description: "Script original de tu entorno: actualizar_repo.sh",
    isUserListed: true
  },
  {
    id: 1001,
    name: "ai-haklab.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQA4XvfOMl9pEG3Qg_mW5zfAohSiK9J6MUgQVvDRwIwcB6-V",
    description: "Script original de tu entorno: ai-haklab.sh",
    isUserListed: true
  },
  {
    id: 1002,
    name: "hivebear_sd_revert.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQBWuAI8rwDR0WrKsNgsCimsWVzyY9NNqJXQcIy6anJDqFZo",
    description: "Script original de tu entorno: hivebear_sd_revert.sh",
    isUserListed: true
  },
  {
    id: 1003,
    name: "hivebear_sd_setup.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQA2SyOAoC98c9-oHgif-wAjUzw49RfzTEzZPn-wJEzXR4DH",
    description: "Script original de tu entorno: hivebear_sd_setup.sh",
    isUserListed: true
  },
  {
    id: 1004,
    name: "hub.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQDmIrtZPD1vq3NuVjAuPQMwa7yyMpJ8crMH_9g9gtbc_fb7",
    description: "Script original de tu entorno: hub.sh",
    isUserListed: true
  },
  {
    id: 1005,
    name: "install-transcriber.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQAbyh70x11bz4bJudJ9DxojonvKe73rMvD0dJwaKEOlUfM2",
    description: "Script original de tu entorno: install-transcriber.sh",
    isUserListed: true
  },
  {
    id: 1006,
    name: "install_baileys.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQAKz2fD6b74AwFxY1T9rkn8qn2C7kMaXhivyKIKNRaoRSvn",
    description: "Script original de tu entorno: install_baileys.sh",
    isUserListed: true
  },
  {
    id: 1007,
    name: "install_hivebear.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQBnE7i6K7KIZLQBCtYA12E6UGrVyAlfzFcc2RDEoJDI5rtB",
    description: "Script original de tu entorno: install_hivebear.sh",
    isUserListed: true
  },
  {
    id: 1008,
    name: "installantigravity.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQDIjP2JwDaMFyQYiCTqs4c4yoT79EkpuuMuzdFujlqyqVD2",
    description: "Script original de tu entorno: installantigravity.sh",
    isUserListed: true
  },
  {
    id: 1009,
    name: "run.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQDwvIiVXVk44KFwVoUcWaqwVf4W_sjxI1W19P1fwkrcojnM",
    description: "Script original de tu entorno: run.sh",
    isUserListed: true
  },
  {
    id: 1010,
    name: "save_registry.py",
    price: "3",
    category: "Termux",
    icon: <Bot size={20} />,
    nftAddress: "EQAka8WnwpxZT31Ue_suIOLuKb4LSK-hRe6z8GxBgiS6YqN4",
    description: "Script original de tu entorno: save_registry.py",
    isUserListed: true
  },
  {
    id: 1011,
    name: "setup_vps_hivebear.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQC0KX8CQaTA1KL9jxwlLCZrOIfuYda0mo8qTUfXGDW10PVd",
    description: "Script original de tu entorno: setup_vps_hivebear.sh",
    isUserListed: true
  },
  {
    id: 1012,
    name: "tts_nika.sh",
    price: "3",
    category: "Termux",
    icon: <Zap size={20} />,
    nftAddress: "EQAab5QOgElgxd2-8ID8R7HRYQo_bbPlWiHE1eFcuWDofQY4",
    description: "Script original de tu entorno: tts_nika.sh",
    isUserListed: true
  },
  {
    id: 1013,
    name: "ver-readme.sh",
    price: "3",
    category: "Termux",
    icon: <Terminal size={20} />,
    nftAddress: "EQD97WqJHZt9OWY6D-dFyCu3ieovxjz7LzMij0bbA-oJFm8n",
    description: "Script original de tu entorno: ver-readme.sh",
    isUserListed: true
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'upload' | 'profile'>('shop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Termux' | 'AI' | 'General'>('All');
  
  useEffect(() => {
    // Load skills from backend API
    fetch('http://localhost:3001/api/skills')
      .then(res => res.json())
      .then(data => {
        const skillsWithIcons = data.map((s: any) => ({
          ...s,
          icon: s.category === 'Termux' ? <Terminal size={20} /> : s.category === 'AI' ? <Bot size={20} /> : <Zap size={20} />
        }));
        setSkills(skillsWithIcons);
      })
      .catch(err => {
        console.error("Error loading skills from API", err);
        // Fallback to local storage if API fails temporarily
        const stored = localStorage.getItem('stablecoincity_skills');
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as Skill[];
            const hasInvalid = parsed.some(s => !s.nftAddress || s.nftAddress.length !== 48);
            if (!hasInvalid) {
              setSkills(parsed.map(s => ({
                ...s,
                icon: s.category === 'Termux' ? <Terminal size={20} /> : s.category === 'AI' ? <Bot size={20} /> : <Zap size={20} />
              })));
              return;
            }
          } catch (e) {}
        }
        setSkills(INITIAL_SKILLS);
      });
  }, []);
  
  // Purchased skills state loaded from localStorage key stablecoincity_purchased
  const [purchasedAddresses, setPurchasedAddresses] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('stablecoincity_purchased');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Profile sub-tab selection: Mis Compras / Mis Ventas
  const [profileSubTab, setProfileSubTab] = useState<'purchases' | 'sales'>('purchases');

  // Custom listing/buying contracts hook
  const { buySkill, listSkill } = useMarketplaceContract();
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress = useTonAddress();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (tonConnectUI) {
      tonConnectUI.uiOptions = {
        uiPreferences: {
          theme: theme === 'dark' ? THEME.DARK : THEME.LIGHT
        }
      };
    }
  }, [theme, tonConnectUI]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Upload Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Termux' | 'AI' | 'General'>('Termux');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'ipfs' | 'minting' | 'listing' | 'success'>('idle');

  // Edit Skill state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState<'Termux' | 'AI' | 'General'>('Termux');

  // Diagnostics panel state
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // API fetch can be done here to load initial skills from the backend in a full implementation.

  const filteredSkills = skills.filter(
    skill => activeCategory === 'All' || skill.category === activeCategory
  );

  const testSimpleTransfer = async () => {
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
            amount: '1000000',
          },
        ],
      };
      await tonConnectUI.sendTransaction(transaction);
      alert('✅ ¡Petición de prueba enviada!');
    } catch (e: any) {
      alert(`❌ Error: ${e.message}`);
    }
  };

  const checkManifest = async () => {
    try {
      const response = await fetch('/tonconnect-manifest.json');
      const manifest = await response.json();
      setDebugInfo(JSON.stringify(manifest, null, 2));
    } catch (e: any) {
      setDebugInfo(`Error: ${e.message}`);
    }
  };

  const handleDownloadScript = async (skill: Skill) => {
    try {
      // In a real app, you would pass an auth token here
      const response = await fetch(`http://localhost:3001/api/files/${skill.nftAddress}`);
      
      if (!response.ok) {
        throw new Error('Archivo no encontrado en el servidor seguro.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // You could extract filename from Content-Disposition header if needed, but let's default to skill name
      link.download = `${skill.name.replace(/\s+/g, '_')}.sh`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`❌ Error al descargar el script: ${err.message}`);
    }
  };

  const handleBuy = async (skill: Skill) => {
    if (!tonConnectUI.connected) {
      alert('❌ Wallet no conectada.');
      tonConnectUI.openModal();
      return;
    }

    if (purchasedAddresses.includes(skill.nftAddress)) {
      alert('❌ Este script ya ha sido comprado.');
      return;
    }
    
    // Validar visualmente la compra con el usuario
    const confirmPurchase = window.confirm(`¿Estás seguro de comprar "${skill.name}" por ${skill.price} TON?`);
    if (!confirmPurchase) {
        return;
    }

    try {
      await buySkill(skill.nftAddress, skill.price);
      
      const newPurchased = [...purchasedAddresses, skill.nftAddress];
      setPurchasedAddresses(newPurchased);
      localStorage.setItem('stablecoincity_purchased', JSON.stringify(newPurchased));

      alert('✅ Transacción enviada correctamente!');
    } catch (e: any) {
      alert(`❌ Error: ${e?.message || 'Error desconocido'}`);
    }
  };

  const handleDeleteSkill = async (skill: Skill) => {
    if (!window.confirm(`¿Estás seguro de que deseas borrar la habilidad "${skill.name}"?`)) {
      return;
    }
    
    setSkills(prev => {
      const next = prev.filter(s => s.id !== skill.id);
      const forStorage = next.map(({ icon, ...rest }) => rest);
      localStorage.setItem('stablecoincity_skills', JSON.stringify(forStorage));
      return next;
    });

    try {
      await fetch(`http://localhost:3001/api/skills/${skill.id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn("Backend offline o error al borrar en el servidor:", e);
    }
  };

  const handleOpenEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setEditName(skill.name);
    setEditDescription(skill.description);
    setEditPrice(skill.price);
    setEditCategory(skill.category);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    const updatedSkill = {
      ...editingSkill,
      name: editName,
      description: editDescription,
      price: editPrice,
      category: editCategory,
      icon: editCategory === 'Termux' ? <Terminal size={20} /> : editCategory === 'AI' ? <Bot size={20} /> : <Zap size={20} />
    };

    setSkills(prev => {
      const next = prev.map(s => s.id === editingSkill.id ? updatedSkill : s);
      const forStorage = next.map(({ icon, ...rest }) => rest);
      localStorage.setItem('stablecoincity_skills', JSON.stringify(forStorage));
      return next;
    });

    setIsEditModalOpen(false);
    setEditingSkill(null);

    try {
      await fetch(`http://localhost:3001/api/skills/${editingSkill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          price: editPrice,
          category: editCategory
        })
      });
    } catch (e) {
      console.warn("Backend offline o error al actualizar en el servidor:", e);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tonConnectUI.connected) {
      alert('❌ Wallet no conectada.');
      tonConnectUI.openModal();
      return;
    }
    if (!name || !description || !price || !file) {
      alert('❌ Completa todos los campos.');
      return;
    }

    try {
      setUploadState('ipfs');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadState('minting');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newNftAddress = generateMockAddress();
      setUploadState('listing');
      await listSkill(newNftAddress, price);

      // Save file data to secure backend API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('nftAddress', newNftAddress);

      const response = await fetch('http://localhost:3001/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo al servidor seguro');
      }

      const newSkill: Skill = {
        id: Date.now(),
        name,
        price,
        category,
        icon: category === 'Termux' ? <Terminal size={20} /> : category === 'AI' ? <Bot size={20} /> : <Zap size={20} />,
        nftAddress: newNftAddress,
        description,
        isUserListed: true
      };

      setSkills(prev => {
        const next = [...prev, newSkill];
        const forStorage = next.map(({ icon, ...rest }) => rest);
        localStorage.setItem('stablecoincity_skills', JSON.stringify(forStorage));
        return next;
      });

      setUploadState('success');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setName('');
      setDescription('');
      setPrice('');
      setCategory('Termux');
      setFile(null);
      setActiveTab('shop');
    } catch (error: any) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setUploadState('idle');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert('📋 ¡Copiado!');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="logo-container">
            <img src="./logo.jpg" alt="SKILLcoin Logo" className="app-logo" />
            <div className="logo">SKILLcoin<span className="logo-dot">.</span></div>
          </div>
        </div>
        <div id="ton-connect-button-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <TonConnectButton />
        </div>
      </header>

      {isMenuOpen && (
        <div className="side-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="side-menu" onClick={(e) => e.stopPropagation()}>
            <div className="side-menu-header">
              <div className="logo-container">
                <img src="./logo.jpg" alt="SKILLcoin Logo" className="app-logo" />
                <div className="logo">SKILLcoin<span className="logo-dot">.</span></div>
              </div>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="side-menu-nav">
              <button 
                className={`side-nav-item ${activeTab === 'shop' ? 'active' : ''}`}
                onClick={() => { setActiveTab('shop'); setIsMenuOpen(false); }}
              >
                <ShoppingBag size={18} />
                <span>Tienda</span>
              </button>
              <button 
                className={`side-nav-item ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => { setActiveTab('upload'); setIsMenuOpen(false); }}
              >
                <PlusCircle size={18} />
                <span>Publicar Skill</span>
              </button>
              <button 
                className={`side-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => { setActiveTab('profile'); setIsMenuOpen(false); }}
              >
                <User size={18} />
                <span>Perfil y Compras</span>
              </button>
            </nav>
            <div className="side-menu-footer">
              <div className="creator-notice">Creado por kuromi04 desde Termux</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shop' && (
        <>
          <section className="hero">
            <h1>Skills de IA a &lt; $10</h1>
            <p>Marketplace descentralizado para Termux y Web 3.0</p>
          </section>

          <div className="category-tabs">
            {['All', 'Termux', 'AI', 'General'].map(cat => (
              <button 
                key={cat}
                className={`tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat as any)}
              >
                {cat === 'All' ? 'Todos' : cat === 'AI' ? 'IA Skills' : cat}
              </button>
            ))}
          </div>

          <main className="skills-grid">
            {filteredSkills.map(skill => (
              <div key={skill.id} className="skill-card interactive-skill-card" onClick={() => setSelectedSkill(skill)}>
                <div className="skill-card-glow"></div>
                <div className="skill-card-header">
                  <div className="skill-icon">{skill.icon}</div>
                  <span className={`category-badge ${skill.category.toLowerCase()}`}>{skill.category}</span>
                </div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-card-footer">
                  <div className="skill-price-tag">{skill.price} TON</div>
                  <span className="skill-action-hint">Detalles &rarr;</span>
                </div>
              </div>
            ))}
          </main>
        </>
      )}

      {activeTab === 'upload' && (
        <div className="upload-container">
          <div className="section-header">
            <Sparkles size={20} className="glow-icon" />
            <h2>Publicar Nueva Habilidad</h2>
          </div>
          
          <div className="economy-card">
            <h3 className="economy-title">Economía del Marketplace</h3>
            <div className="economy-list">
              <div className="economy-item">
                <div className="economy-item-main">
                  <span className="economy-label">Fee de listado</span>
                  <span className="economy-value">0.01 TON</span>
                </div>
                <p className="economy-desc">Se cobra de tu wallet al momento de listar el skill.</p>
              </div>
              <div className="economy-item">
                <div className="economy-item-main">
                  <span className="economy-label">Comisión de venta</span>
                  <span className="economy-value">5%</span>
                </div>
                <p className="economy-desc">Deducido automáticamente de cada venta y enviado a la wallet del administrador.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUploadSubmit} className="upload-form">
            <div className="form-group">
              <label className="form-label">Nombre del Script / Skill</label>
              <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea className="form-textarea" value={description} onChange={e => setDescription(e.target.value)} required rows={4} />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Precio en TON</label>
                <input type="number" step="0.0001" className="form-input" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div className="form-group half">
                <label className="form-label">Categoría</label>
                <select className="form-select" value={category} onChange={e => setCategory(e.target.value as any)} required>
                  <option value="Termux">Termux</option>
                  <option value="AI">AI</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subir Archivo de Script / Código (.sh, .py, .js, .json)</label>
              <div 
                className={`file-dropzone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input 
                  id="file-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".sh,.py,.js,.json,.txt,.ts"
                />
                {file ? (
                  <div className="file-info-preview">
                    <FileCode size={36} className="file-icon" />
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <div className="file-status">Listo para acuñar</div>
                  </div>
                ) : (
                  <div className="dropzone-placeholder">
                    <UploadCloud size={36} className="upload-icon" />
                    <p className="dropzone-text">Arrastra tu script aquí o <span>haz clic para examinar</span></p>
                    <span className="dropzone-subtext">Soporta scripts Bash, Python, JavaScript o JSON</span>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="submit-button">Crear y Listar NFT</button>
          </form>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar-placeholder"><User size={32} /></div>
            <div className="profile-title-area">
              <h2>Mi Perfil</h2>
              <span className="network-badge">TON Blockchain</span>
            </div>
          </div>

          <div className="wallet-card-container">
            <h3>Billetera TON</h3>
            {walletAddress ? (
              <div className="wallet-connected-box">
                <div className="wallet-addr-display">
                  <span className="wallet-addr-label">Tu Dirección</span>
                  <span className="wallet-addr-value">{walletAddress}</span>
                </div>
                <div className="wallet-actions">
                  <button onClick={handleCopyAddress} className="wallet-action-btn">
                    <Copy size={14} /> Copiar
                  </button>
                  <a 
                    href={`https://tonviewer.org/${walletAddress}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="wallet-action-btn link"
                  >
                    <ExternalLink size={14} /> Explorador
                  </a>
                </div>
              </div>
            ) : (
              <div className="wallet-disconnected-box">
                <p>Conecta tu wallet para ver tu dirección y gestionar tus habilidades publicadas.</p>
                <button onClick={() => tonConnectUI.openModal()} className="wallet-connect-trigger-btn">
                  Conectar Wallet
                </button>
              </div>
            )}
          </div>

          <div className="user-skills-section">
            <div className="profile-sub-tabs">
              <button 
                type="button"
                className={`profile-sub-tab ${profileSubTab === 'purchases' ? 'active' : ''}`}
                onClick={() => setProfileSubTab('purchases')}
              >
                Mis Compras
              </button>
              <button 
                type="button"
                className={`profile-sub-tab ${profileSubTab === 'sales' ? 'active' : ''}`}
                onClick={() => setProfileSubTab('sales')}
              >
                Mis Ventas
              </button>
            </div>

            {profileSubTab === 'purchases' ? (
              <div className="profile-tab-content">
                {skills.filter(s => purchasedAddresses.includes(s.nftAddress)).length > 0 ? (
                  <div className="user-skills-list">
                    {skills.filter(s => purchasedAddresses.includes(s.nftAddress)).map(skill => (
                      <div key={skill.id} className="user-skill-item purchase-item">
                        <div className="user-skill-icon">{skill.icon}</div>
                        <div className="user-skill-info">
                          <div className="user-skill-name">{skill.name}</div>
                          <div className="user-skill-addr">{skill.nftAddress.slice(0, 10)}...{skill.nftAddress.slice(-8)}</div>
                        </div>
                        <button 
                          className="download-script-btn" 
                          onClick={() => handleDownloadScript(skill)}
                        >
                          Descargar Script
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-skills-box">
                    <p>Aún no has comprado ninguna habilidad.</p>
                    <button onClick={() => setActiveTab('shop')} className="go-to-upload-btn">
                      Ir a la Tienda <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="profile-tab-content">
                {skills.filter(s => s.isUserListed).length > 0 ? (
                  <div className="user-skills-list">
                    {skills.filter(s => s.isUserListed).map(skill => (
                      <div key={skill.id} className="user-skill-item">
                        <div className="user-skill-icon">{skill.icon}</div>
                        <div className="user-skill-info">
                          <div className="user-skill-name">{skill.name}</div>
                          <div className="user-skill-addr">{skill.nftAddress.slice(0, 10)}...{skill.nftAddress.slice(-8)}</div>
                        </div>
                        <div className="user-skill-meta-actions">
                          <div className="user-skill-price">{skill.price} TON</div>
                          <div className="user-skill-buttons">
                            <button 
                              onClick={() => handleOpenEditModal(skill)} 
                              className="user-action-btn edit-btn"
                              title="Modificar Habilidad"
                            >
                              <Edit size={14} /> Modificar
                            </button>
                            <button 
                              onClick={() => handleDeleteSkill(skill)} 
                              className="user-action-btn delete-btn"
                              title="Borrar Habilidad"
                            >
                              <Trash2 size={14} /> Borrar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-skills-box">
                    <p>No tienes habilidades publicadas en este momento.</p>
                    <button onClick={() => setActiveTab('upload')} className="go-to-upload-btn">
                      Publicar Habilidad <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="diagnostics-accordion">
            <button 
              type="button" 
              className="diagnostics-accordion-header"
              onClick={() => setShowDiagnostics(!showDiagnostics)}
            >
              <Info size={16} /> <span>Panel de Diagnóstico</span> <ChevronRight size={16} className={`chevron ${showDiagnostics ? 'rotate' : ''}`} />
            </button>
            {showDiagnostics && (
              <div className="diagnostics-content">
                <div className="diagnostics-buttons">
                  <button onClick={checkManifest} className="diagnostic-btn">Verificar Manifest</button>
                  <button onClick={testSimpleTransfer} className="diagnostic-btn">Prueba Transferencia</button>
                </div>
                {debugInfo && <pre className="diagnostic-pre">{debugInfo}</pre>}
              </div>
            )}
          </div>
        </div>
      )}

      {uploadState !== 'idle' && (
        <div className="progress-overlay">
          <div className="progress-card">
            <h3>Preparando Habilidad</h3>
            <div className="progress-steps-list">
              <div className={`progress-step-item ${uploadState === 'ipfs' ? 'active' : ''} ${['minting', 'listing', 'success'].includes(uploadState) ? 'completed' : ''}`}>
                <div className="step-indicator">
                  {['minting', 'listing', 'success'].includes(uploadState) ? (
                    <CheckCircle2 size={18} className="icon-success" />
                  ) : uploadState === 'ipfs' ? (
                    <Loader2 size={18} className="animate-spin text-accent" />
                  ) : (
                    <span>1</span>
                  )}
                </div>
                <div className="step-content">
                  <span className="step-title">IPFS Upload</span>
                  <span className="step-desc">Subiendo código de agente a IPFS...</span>
                </div>
              </div>

              <div className={`progress-step-item ${uploadState === 'minting' ? 'active' : ''} ${['listing', 'success'].includes(uploadState) ? 'completed' : ''}`}>
                <div className="step-indicator">
                  {['listing', 'success'].includes(uploadState) ? (
                    <CheckCircle2 size={18} className="icon-success" />
                  ) : uploadState === 'minting' ? (
                    <Loader2 size={18} className="animate-spin text-accent" />
                  ) : (
                    <span>2</span>
                  )}
                </div>
                <div className="step-content">
                  <span className="step-title">Blockchain Minting</span>
                  <span className="step-desc">Mintando NFT en TON Blockchain...</span>
                </div>
              </div>

              <div className={`progress-step-item ${uploadState === 'listing' ? 'active' : ''} ${uploadState === 'success' ? 'completed' : ''}`}>
                <div className="step-indicator">
                  {uploadState === 'success' ? (
                    <CheckCircle2 size={18} className="icon-success" />
                  ) : uploadState === 'listing' ? (
                    <Loader2 size={18} className="animate-spin text-accent" />
                  ) : (
                    <span>3</span>
                  )}
                </div>
                <div className="step-content">
                  <span className="step-title">Listing Smart Contract</span>
                  <span className="step-desc">Confirmando en tu Wallet...</span>
                </div>
              </div>
            </div>

            {uploadState === 'listing' && (
              <div className="wallet-prompt-hint animate-pulse">
                Por favor, abre tu billetera TON y confirma la transacción de listado.
              </div>
            )}

            {uploadState === 'success' && (
              <div className="success-banner">
                <CheckCircle2 size={42} className="success-large-icon" />
                <h4>¡Publicado con éxito!</h4>
                <p>El skill ya se encuentra visible en la tienda.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>SKILLcoin &bull; Creado por <strong>kuromi04</strong> desde <strong>Termux</strong></p>
      </footer>

      {selectedSkill && (
        <div className="bottom-sheet-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-bar" onClick={() => setSelectedSkill(null)}></div>
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-title-row">
                <div className="bottom-sheet-icon">{selectedSkill.icon}</div>
                <div>
                  <h3 className="bottom-sheet-title">{selectedSkill.name}</h3>
                  <span className={`category-badge ${selectedSkill.category.toLowerCase()}`}>{selectedSkill.category}</span>
                </div>
              </div>
              <button className="close-sheet-btn" onClick={() => setSelectedSkill(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="bottom-sheet-body">
              <div className="bottom-sheet-section">
                <span className="section-label">Descripción</span>
                <p className="bottom-sheet-desc">{selectedSkill.description}</p>
              </div>

              <div className="bottom-sheet-section">
                <span className="section-label">Detalles de la Habilidad</span>
                <div className="tech-details-box">
                  <div className="tech-detail-row">
                    <span className="detail-key">NFT Address:</span>
                    <span className="detail-value addr-value">
                      {selectedSkill.nftAddress.slice(0, 10)}...{selectedSkill.nftAddress.slice(-8)}
                      <button className="copy-addr-btn" onClick={() => {
                        navigator.clipboard.writeText(selectedSkill.nftAddress);
                        alert('📋 ¡Dirección de contrato copiada!');
                      }} title="Copiar Dirección">
                        <Copy size={12} />
                      </button>
                    </span>
                  </div>
                  <div className="tech-detail-row">
                    <span className="detail-key">Precio:</span>
                    <span className="detail-value price-value">{selectedSkill.price} TON</span>
                  </div>
                  <div className="tech-detail-row">
                    <span className="detail-key">Entorno:</span>
                    <span className="detail-value">Termux Android / Linux</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-sheet-footer">
              {purchasedAddresses.includes(selectedSkill.nftAddress) ? (
                <button 
                  className="sheet-action-btn success-btn"
                  onClick={() => {
                    handleDownloadScript(selectedSkill);
                    setSelectedSkill(null);
                  }}
                >
                  <FileCode size={18} />
                  <span>Descargar Script Ejecutable</span>
                </button>
              ) : (
                <button 
                  className="sheet-action-btn buy-btn"
                  onClick={() => {
                    handleBuy(selectedSkill);
                    setSelectedSkill(null);
                  }}
                >
                  <Zap size={18} />
                  <span>Comprar por {selectedSkill.price} TON</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingSkill && (
        <div className="bottom-sheet-overlay" onClick={() => {
          setIsEditModalOpen(false);
          setEditingSkill(null);
        }}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-bar" onClick={() => {
              setIsEditModalOpen(false);
              setEditingSkill(null);
            }}></div>
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-title-row">
                <div className="bottom-sheet-icon"><Edit size={20} className="text-accent" /></div>
                <div>
                  <h3 className="bottom-sheet-title">Modificar Habilidad</h3>
                  <span className="network-badge">Editar Detalles</span>
                </div>
              </div>
              <button className="close-sheet-btn" onClick={() => {
                setIsEditModalOpen(false);
                setEditingSkill(null);
              }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="bottom-sheet-body upload-form" style={{ padding: '20px 0' }}>
              <div className="form-group">
                <label className="form-label">Nombre del Script / Skill</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-textarea" 
                  value={editDescription} 
                  onChange={e => setEditDescription(e.target.value)} 
                  required 
                  rows={4} 
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">Precio en TON</label>
                  <input 
                    type="number" 
                    step="0.0001" 
                    className="form-input" 
                    value={editPrice} 
                    onChange={e => setEditPrice(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group half">
                  <label className="form-label">Categoría</label>
                  <select 
                    className="form-select" 
                    value={editCategory} 
                    onChange={e => setEditCategory(e.target.value as any)} 
                    required
                  >
                    <option value="Termux">Termux</option>
                    <option value="AI">AI</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="bottom-sheet-footer" style={{ padding: '20px 0 0 0', background: 'transparent' }}>
                <button type="submit" className="sheet-action-btn success-btn" style={{ width: '100%' }}>
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
