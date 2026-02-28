// ─── TYPES ────────────────────────────────────────────────────────────────────

export type Tier = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: string;
  username: string;
  avatar: string;
  tier: Tier;
  rep: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  author: User;
  createdAt: string;
  endsAt: string;
  submissionCount: number;
  viewCount: number;
  topScore: number;
  prize: number | null;
  tags: string[];
  status: 'open' | 'closed' | 'judging';
}

export interface Visualization {
  id: string;
  challengeId: string;
  challenge: Challenge;
  author: User;
  title: string;
  description: string;
  imageUrl: string;
  score: number | null;
  rank: number | null;
  aiVerdict: string | null;
  likes: number;
  saves: number;
  views: number;
  createdAt: string;
  tags: string[];
}

export type Category =
  | 'Network Security'
  | 'Web Security'
  | 'Malware Analysis'
  | 'Cryptography'
  | 'Forensics'
  | 'Cloud Security'
  | 'Reverse Engineering'
  | 'Penetration Testing';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

// ─── MOCK USERS ───────────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'nx_0x1337',  avatar: 'NX', tier: 5, rep: 8420 },
  { id: 'u2', username: 'cypher_iv',  avatar: 'CV', tier: 4, rep: 3210 },
  { id: 'u3', username: 'v01d_sec',   avatar: 'VS', tier: 3, rep: 1840 },
  { id: 'u4', username: 'gr4y_h4t',   avatar: 'GH', tier: 3, rep: 1205 },
  { id: 'u5', username: 'zer0_day',   avatar: 'ZD', tier: 2, rep: 640  },
  { id: 'u6', username: 'ph4ntom_x',  avatar: 'PX', tier: 4, rep: 2890 },
  { id: 'u7', username: 'r3d_kernel', avatar: 'RK', tier: 5, rep: 6100 },
  { id: 'u8', username: 'null_ptr',   avatar: 'NP', tier: 2, rep: 480  },
];

export const CURRENT_USER: User = {
  id: 'me', username: 'you_operator', avatar: 'YO', tier: 3, rep: 920,
};

// ─── MOCK CHALLENGES ──────────────────────────────────────────────────────────

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Map a Zero-Day Exploit Chain',
    description: 'Visualize a complete zero-day exploit chain from initial reconnaissance to privilege escalation. Must include all attack stages, lateral movement paths, and persistence mechanisms.',
    category: 'Penetration Testing',
    difficulty: 'Expert',
    author: MOCK_USERS[0],
    createdAt: '2025-01-20T10:00:00Z',
    endsAt: '2025-02-20T23:59:00Z',
    submissionCount: 34,
    viewCount: 2840,
    topScore: 94,
    prize: 2000,
    tags: ['exploit', 'zero-day', 'APT', 'chain'],
    status: 'open',
  },
  {
    id: 'c2',
    title: 'DNS Tunneling Detection Architecture',
    description: 'Design a visualization showing how DNS tunneling works and the detection mechanisms at each network layer. Include traffic analysis patterns and anomaly detection points.',
    category: 'Network Security',
    difficulty: 'Advanced',
    author: MOCK_USERS[2],
    createdAt: '2025-01-22T14:00:00Z',
    endsAt: '2025-02-15T23:59:00Z',
    submissionCount: 21,
    viewCount: 1620,
    topScore: 88,
    prize: null,
    tags: ['DNS', 'tunneling', 'detection', 'network'],
    status: 'open',
  },
  {
    id: 'c3',
    title: 'Ransomware Encryption Flow',
    description: 'Visualize the complete encryption workflow of a modern ransomware sample including key generation, file targeting logic, and C2 communication channels.',
    category: 'Malware Analysis',
    difficulty: 'Advanced',
    author: MOCK_USERS[6],
    createdAt: '2025-01-18T09:00:00Z',
    endsAt: '2025-02-10T23:59:00Z',
    submissionCount: 47,
    viewCount: 3910,
    topScore: 97,
    prize: 2000,
    tags: ['ransomware', 'encryption', 'C2', 'malware'],
    status: 'judging',
  },
  {
    id: 'c4',
    title: 'OAuth 2.0 Attack Vectors',
    description: 'Map all known OAuth 2.0 misconfigurations and attack vectors. Include token hijacking, open redirects, PKCE bypass, and consent phishing with mitigation paths.',
    category: 'Web Security',
    difficulty: 'Intermediate',
    author: MOCK_USERS[1],
    createdAt: '2025-01-25T11:00:00Z',
    endsAt: '2025-02-25T23:59:00Z',
    submissionCount: 18,
    viewCount: 1240,
    topScore: 82,
    prize: null,
    tags: ['OAuth', 'web', 'authentication', 'tokens'],
    status: 'open',
  },
  {
    id: 'c5',
    title: 'Cloud IAM Privilege Escalation',
    description: 'Visualize privilege escalation paths in AWS/Azure/GCP IAM systems. Show misconfigurations, role chaining, and lateral movement within cloud environments.',
    category: 'Cloud Security',
    difficulty: 'Advanced',
    author: MOCK_USERS[5],
    createdAt: '2025-01-28T08:00:00Z',
    endsAt: '2025-03-01T23:59:00Z',
    submissionCount: 12,
    viewCount: 980,
    topScore: 79,
    prize: null,
    tags: ['IAM', 'cloud', 'privilege', 'AWS', 'Azure'],
    status: 'open',
  },
  {
    id: 'c6',
    title: 'Memory Forensics Timeline',
    description: 'Create a visualization showing how to extract and analyze artifacts from a memory dump. Include process trees, network connections, and injected code detection.',
    category: 'Forensics',
    difficulty: 'Intermediate',
    author: MOCK_USERS[3],
    createdAt: '2025-01-15T16:00:00Z',
    endsAt: '2025-02-05T23:59:00Z',
    submissionCount: 29,
    viewCount: 2100,
    topScore: 91,
    prize: 2000,
    tags: ['forensics', 'memory', 'volatility', 'artifacts'],
    status: 'closed',
  },
];

// ─── MOCK VISUALIZATIONS ──────────────────────────────────────────────────────

export const MOCK_VISUALIZATIONS: Visualization[] = [
  {
    id: 'v1',
    challengeId: 'c1',
    challenge: MOCK_CHALLENGES[0],
    author: MOCK_USERS[1],
    title: 'APT41 Style Exploit Chain Diagram',
    description: 'A comprehensive D3.js force-directed graph showing all stages of an APT41-style attack chain including initial access via spear phishing, lateral movement through Pass-the-Hash, and persistence via scheduled tasks.',
    imageUrl: '',
    score: 94,
    rank: 1,
    aiVerdict: 'Exceptional clarity in representing lateral movement paths. Force-directed layout effectively communicates attack stage relationships. Minor improvement needed in legend readability.',
    likes: 284,
    saves: 147,
    views: 1840,
    createdAt: '2025-01-22T14:30:00Z',
    tags: ['D3.js', 'force-graph', 'APT', 'attack-chain'],
  },
  {
    id: 'v2',
    challengeId: 'c2',
    challenge: MOCK_CHALLENGES[1],
    author: MOCK_USERS[4],
    title: 'DNS Tunnel Traffic Heatmap',
    description: 'Three.js 3D visualization of DNS query patterns over time. Anomalous tunneling traffic clearly visible as heat signature deviations from baseline.',
    imageUrl: '',
    score: 88,
    rank: 1,
    aiVerdict: 'Creative use of 3D space to represent temporal patterns. The heat signature approach for anomaly detection is highly intuitive. Depth perception could be improved with better lighting.',
    likes: 196,
    saves: 89,
    views: 1240,
    createdAt: '2025-01-24T09:15:00Z',
    tags: ['Three.js', '3D', 'heatmap', 'anomaly'],
  },
  {
    id: 'v3',
    challengeId: 'c3',
    challenge: MOCK_CHALLENGES[2],
    author: MOCK_USERS[0],
    title: 'LockBit 3.0 Encryption Pipeline',
    description: 'Detailed flowchart of LockBit 3.0 encryption routine including multi-threaded file targeting, AES-256 + RSA-2048 key hierarchy, and Tor-based C2 beacon.',
    imageUrl: '',
    score: 97,
    rank: 1,
    aiVerdict: 'Outstanding technical accuracy and visual hierarchy. The key management diagram is textbook quality. Sets new benchmark for this challenge category.',
    likes: 412,
    saves: 223,
    views: 3120,
    createdAt: '2025-01-20T18:00:00Z',
    tags: ['LockBit', 'encryption', 'flowchart', 'malware'],
  },
  {
    id: 'v4',
    challengeId: 'c4',
    challenge: MOCK_CHALLENGES[3],
    author: MOCK_USERS[3],
    title: 'OAuth 2.0 Attack Surface Map',
    description: 'Comprehensive mind-map style visualization of all OAuth 2.0 attack surfaces with color-coded risk levels and mitigation strategies.',
    imageUrl: '',
    score: 82,
    rank: 2,
    aiVerdict: 'Good coverage of attack vectors. Risk color-coding is effective. Missing PKCE bypass scenarios and device code flow attacks which are increasingly relevant.',
    likes: 143,
    saves: 67,
    views: 890,
    createdAt: '2025-01-27T11:45:00Z',
    tags: ['OAuth', 'mind-map', 'attack-surface'],
  },
  {
    id: 'v5',
    challengeId: 'c5',
    challenge: MOCK_CHALLENGES[4],
    author: MOCK_USERS[2],
    title: 'AWS IAM Privilege Escalation Paths',
    description: 'Interactive graph showing 20+ privilege escalation paths in AWS IAM. Nodes represent IAM entities, edges show escalation vectors with exploitability scores.',
    imageUrl: '',
    score: 79,
    rank: 1,
    aiVerdict: 'Solid technical content. Graph layout is clean and navigable. Would benefit from distinguishing between misconfigurations vs design flaws more clearly.',
    likes: 98,
    saves: 54,
    views: 640,
    createdAt: '2025-01-30T16:20:00Z',
    tags: ['AWS', 'IAM', 'graph', 'privilege-escalation'],
  },
  {
    id: 'v6',
    challengeId: 'c6',
    challenge: MOCK_CHALLENGES[5],
    author: MOCK_USERS[6],
    title: 'Volatility Memory Analysis Flow',
    description: 'Step-by-step visual guide to memory forensics using Volatility 3. Includes process hiding detection, network artifact extraction, and malware hunting workflows.',
    imageUrl: '',
    score: 91,
    rank: 1,
    aiVerdict: 'Pedagogically excellent. The step-by-step flow is ideal for educational purposes. Volatility command annotations are a nice touch that adds practical value.',
    likes: 267,
    saves: 134,
    views: 1780,
    createdAt: '2025-01-17T13:00:00Z',
    tags: ['Volatility', 'memory', 'forensics', 'workflow'],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export const TIER_LABELS: Record<Tier, string> = {
  1: 'RECRUIT',
  2: 'ANALYST',
  3: 'OPERATOR',
  4: 'SPECIALIST',
  5: 'IDOL',
};

export const TIER_COLORS: Record<Tier, string> = {
  1: '#94a3b8',
  2: '#60a5fa',
  3: '#00d4ff',
  4: '#a855f7',
  5: '#f59e0b',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner:     '#10b981',
  Intermediate: '#00d4ff',
  Advanced:     '#f59e0b',
  Expert:       '#ef4444',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  'Network Security':    '◈',
  'Web Security':        '⬡',
  'Malware Analysis':    '◆',
  'Cryptography':        '▲',
  'Forensics':           '◉',
  'Cloud Security':      '⬢',
  'Reverse Engineering': '◇',
  'Penetration Testing': '▸',
};

export const ALL_CATEGORIES: Category[] = [
  'Network Security', 'Web Security', 'Malware Analysis',
  'Cryptography', 'Forensics', 'Cloud Security',
  'Reverse Engineering', 'Penetration Testing',
];

export const ALL_DIFFICULTIES: Difficulty[] = [
  'Beginner', 'Intermediate', 'Advanced', 'Expert',
];