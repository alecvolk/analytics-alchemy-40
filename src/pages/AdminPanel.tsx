import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Settings, Save, X, Eye, EyeOff, TrendingUp, Package, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPanel() {
  const {
    products,
    metrics,
    visibility,
    updateProduct,
    updateMetrics,
    updateRevenueHistory,
    updateCategoryBreakdown,
    toggleVisibility,
    confirmChanges,
    discardChanges,
    hasPendingChanges,
  } = useDashboardStore();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [changeReason, setChangeReason] = useState('');

  const handleInputChange = (id: string, field: keyof typeof products[0], value: string) => {
    const numericFields = ['price', 'stock', 'sales', 'conversionRate'];
    const parsedValue = numericFields.includes(field) ? parseFloat(value) : value;
    updateProduct(id, { [field]: parsedValue });
  };

  const handleMetricChange = (field: keyof typeof metrics, value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      updateMetrics({ [field]: parsedValue });
    }
  };

  const handleConfirm = () => {
    if (!changeReason.trim()) {
      toast.error('Please provide a reason for the changes');
      return;
    }
    confirmChanges(changeReason);
    setShowConfirmDialog(false);
    setChangeReason('');
    toast.success('Changes saved successfully');
  };

  const handleDiscard = () => {
    discardChanges();
    toast.info('Changes discarded');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Admin Control Panel
          </h1>
          <p className="text-muted-foreground">
            Full control over all dashboard data and visibility settings
          </p>
        </div>
        {hasPendingChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDiscard}>
              <X className="w-4 h-4 mr-2" />
              Discard
            </Button>
            <Button onClick={() => setShowConfirmDialog(true)}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="visibility" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visibility">
            <Eye className="w-4 h-4 mr-2" />
            Visibility
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <TrendingUp className="w-4 h-4 mr-2" />
            KPI Metrics
          </TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart3 className="w-4 h-4 mr-2" />
            Chart Data
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visibility" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Dashboard Visibility Controls</CardTitle>
              <CardDescription>
                Toggle visibility of different dashboard sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">KPI Cards</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide revenue, AOV, and conversion rate cards
                  </p>
                </div>
                <Switch
                  checked={visibility.kpiCards}
                  onCheckedChange={() => toggleVisibility('kpiCards')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Revenue Chart</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide revenue trend line chart
                  </p>
                </div>
                <Switch
                  checked={visibility.revenueChart}
                  onCheckedChange={() => toggleVisibility('revenueChart')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Category Pie Chart</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide category breakdown pie chart
                  </p>
                </div>
                <Switch
                  checked={visibility.categoryPieChart}
                  onCheckedChange={() => toggleVisibility('categoryPieChart')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Category Bar Chart</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide category performance bar chart
                  </p>
                </div>
                <Switch
                  checked={visibility.categoryBarChart}
                  onCheckedChange={() => toggleVisibility('categoryBarChart')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Products Table</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide products inventory table
                  </p>
                </div>
                <Switch
                  checked={visibility.productsTable}
                  onCheckedChange={() => toggleVisibility('productsTable')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Analytics Charts</Label>
                  <p className="text-sm text-muted-foreground">
                    Show/hide all charts on analytics page
                  </p>
                </div>
                <Switch
                  checked={visibility.analyticsCharts}
                  onCheckedChange={() => toggleVisibility('analyticsCharts')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>KPI Metrics Editor</CardTitle>
              <CardDescription>
                Directly edit key performance indicator values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Total Revenue ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    step="0.01"
                    value={metrics.revenue}
                    onChange={(e) => handleMetricChange('revenue', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aov">Average Order Value ($)</Label>
                  <Input
                    id="aov"
                    type="number"
                    step="0.01"
                    value={metrics.aov}
                    onChange={(e) => handleMetricChange('aov', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    step="0.1"
                    value={metrics.conversionRate}
                    onChange={(e) => handleMetricChange('conversionRate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Revenue History Editor</CardTitle>
              <CardDescription>
                Edit revenue data for the last 30 days (showing last 10 for simplicity)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {metrics.revenueHistory.slice(-10).map((item, index) => {
                  const actualIndex = metrics.revenueHistory.length - 10 + index;
                  return (
                    <div key={actualIndex} className="space-y-2">
                      <Label className="text-xs">
                        {new Date(item.date).toLocaleDateString()}
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.revenue}
                        onChange={(e) =>
                          updateRevenueHistory(actualIndex, parseFloat(e.target.value))
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Category Breakdown Editor</CardTitle>
              <CardDescription>Edit revenue values by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {metrics.categoryBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <Label>{item.category}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.value}
                      onChange={(e) =>
                        updateCategoryBreakdown(index, parseFloat(e.target.value))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="shadow-lg border-2 border-accent/20">
            <CardHeader>
              <CardTitle>Product Data Editor</CardTitle>
              <CardDescription>
                Edit product information including prices, stock, sales, and conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Conv. Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <Input
                            value={product.name}
                            onChange={(e) =>
                              handleInputChange(product.id, 'name', e.target.value)
                            }
                            className="min-w-[200px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={product.category}
                            onChange={(e) =>
                              handleInputChange(product.id, 'category', e.target.value)
                            }
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={product.price}
                            onChange={(e) =>
                              handleInputChange(product.id, 'price', e.target.value)
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={product.stock}
                            onChange={(e) =>
                              handleInputChange(product.id, 'stock', e.target.value)
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={product.sales}
                            onChange={(e) =>
                              handleInputChange(product.id, 'sales', e.target.value)
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.1"
                            value={product.conversionRate}
                            onChange={(e) =>
                              handleInputChange(product.id, 'conversionRate', e.target.value)
                            }
                            className="w-24"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Please provide a reason for these changes. This will be logged in the audit trail.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Changes</Label>
              <Textarea
                id="reason"
                placeholder="e.g., Updating Q4 pricing strategy and promotional data"
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm & Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
