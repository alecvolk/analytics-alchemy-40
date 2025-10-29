import { create } from 'zustand';

export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  conversionRate: number;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  field: string;
  oldValue: string | number;
  newValue: string | number;
  reason?: string;
}

export interface DashboardMetrics {
  revenue: number;
  aov: number;
  conversionRate: number;
  revenueHistory: { date: string; revenue: number }[];
  categoryBreakdown: { category: string; value: number }[];
}

interface DashboardState {
  // User
  currentUser: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  // Admin mode
  adminMode: boolean;
  toggleAdminMode: () => void;
  
  // Data
  products: Product[];
  originalProducts: Product[];
  metrics: DashboardMetrics;
  auditLogs: AuditLog[];
  
  // Pending changes
  hasPendingChanges: boolean;
  
  // Actions
  updateProduct: (id: string, updates: Partial<Product>) => void;
  confirmChanges: (reason: string) => void;
  discardChanges: () => void;
  exportData: (format: 'csv' | 'png' | 'pdf') => void;
}

// Mock data
const generateMockProducts = (): Product[] => [
  { id: '1', sku: 'PRD-001', name: 'Premium Headphones', category: 'Electronics', price: 299.99, stock: 150, sales: 342, conversionRate: 4.2 },
  { id: '2', sku: 'PRD-002', name: 'Wireless Mouse', category: 'Electronics', price: 49.99, stock: 450, sales: 1205, conversionRate: 5.8 },
  { id: '3', sku: 'PRD-003', name: 'Mechanical Keyboard', category: 'Electronics', price: 159.99, stock: 200, sales: 523, conversionRate: 3.9 },
  { id: '4', sku: 'PRD-004', name: 'USB-C Hub', category: 'Accessories', price: 79.99, stock: 320, sales: 892, conversionRate: 6.1 },
  { id: '5', sku: 'PRD-005', name: 'Laptop Stand', category: 'Accessories', price: 89.99, stock: 180, sales: 445, conversionRate: 4.5 },
  { id: '6', sku: 'PRD-006', name: 'Webcam HD', category: 'Electronics', price: 129.99, stock: 95, sales: 278, conversionRate: 3.2 },
  { id: '7', sku: 'PRD-007', name: 'Phone Case', category: 'Accessories', price: 24.99, stock: 800, sales: 2156, conversionRate: 7.3 },
  { id: '8', sku: 'PRD-008', name: 'Screen Protector', category: 'Accessories', price: 14.99, stock: 1200, sales: 3421, conversionRate: 8.1 },
  { id: '9', sku: 'PRD-009', name: 'Bluetooth Speaker', category: 'Electronics', price: 199.99, stock: 125, sales: 389, conversionRate: 4.7 },
  { id: '10', sku: 'PRD-010', name: 'Power Bank', category: 'Accessories', price: 59.99, stock: 550, sales: 1834, conversionRate: 6.9 },
];

const calculateMetrics = (products: Product[]): DashboardMetrics => {
  const revenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const aov = totalSales > 0 ? revenue / totalSales : 0;
  const avgConversion = products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length;

  // Generate revenue history for last 30 days
  const revenueHistory = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dailyRevenue = revenue / 30 * (0.8 + Math.random() * 0.4); // Some variation
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(dailyRevenue * 100) / 100,
    };
  });

  // Category breakdown
  const categoryMap = new Map<string, number>();
  products.forEach(p => {
    const current = categoryMap.get(p.category) || 0;
    categoryMap.set(p.category, current + (p.price * p.sales));
  });

  const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, value]) => ({
    category,
    value: Math.round(value * 100) / 100,
  }));

  return {
    revenue: Math.round(revenue * 100) / 100,
    aov: Math.round(aov * 100) / 100,
    conversionRate: Math.round(avgConversion * 100) / 100,
    revenueHistory,
    categoryBreakdown,
  };
};

export const useDashboardStore = create<DashboardState>((set, get) => {
  const initialProducts = generateMockProducts();
  
  return {
    currentUser: 'admin@dashboard.com',
    userRole: 'admin',
    adminMode: false,
    products: initialProducts,
    originalProducts: initialProducts,
    metrics: calculateMetrics(initialProducts),
    auditLogs: [],
    hasPendingChanges: false,

    setUserRole: (role) => set({ userRole: role }),

    toggleAdminMode: () => {
      const { adminMode, userRole } = get();
      if (userRole === 'admin') {
        set({ adminMode: !adminMode });
      }
    },

    updateProduct: (id, updates) => {
      const { products } = get();
      const updatedProducts = products.map(p =>
        p.id === id ? { ...p, ...updates } : p
      );
      set({
        products: updatedProducts,
        metrics: calculateMetrics(updatedProducts),
        hasPendingChanges: true,
      });
    },

    confirmChanges: (reason) => {
      const { products, originalProducts, currentUser } = get();
      const logs: AuditLog[] = [];

      // Generate audit logs for each change
      products.forEach(product => {
        const original = originalProducts.find(p => p.id === product.id);
        if (!original) return;

        Object.keys(product).forEach(key => {
          const typedKey = key as keyof Product;
          if (product[typedKey] !== original[typedKey] && typedKey !== 'id') {
            logs.push({
              id: `${Date.now()}-${Math.random()}`,
              timestamp: new Date(),
              user: currentUser,
              action: 'UPDATE',
              field: `${product.name} - ${key}`,
              oldValue: original[typedKey],
              newValue: product[typedKey],
              reason,
            });
          }
        });
      });

      set({
        originalProducts: [...products],
        auditLogs: [...logs, ...get().auditLogs],
        hasPendingChanges: false,
      });
    },

    discardChanges: () => {
      const { originalProducts } = get();
      set({
        products: [...originalProducts],
        metrics: calculateMetrics(originalProducts),
        hasPendingChanges: false,
      });
    },

    exportData: (format) => {
      console.log(`Exporting data as ${format}...`);
      // Mock export functionality
    },
  };
});
