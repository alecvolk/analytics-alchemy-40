import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Settings, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPanel() {
  const { products, updateProduct, confirmChanges, discardChanges, hasPendingChanges } =
    useDashboardStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [changeReason, setChangeReason] = useState('');

  const handleInputChange = (id: string, field: keyof typeof products[0], value: string) => {
    const numericFields = ['price', 'stock', 'sales', 'conversionRate'];
    const parsedValue = numericFields.includes(field) ? parseFloat(value) : value;
    updateProduct(id, { [field]: parsedValue });
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
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Edit product data and manage your inventory
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

      <Card className="shadow-xl border-2 border-accent/20">
        <CardHeader>
          <CardTitle>Product Data Editor</CardTitle>
          <CardDescription>
            Make changes to product information. All changes require a reason and will be logged.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
                        onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
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
                        onChange={(e) => handleInputChange(product.id, 'price', e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleInputChange(product.id, 'stock', e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.sales}
                        onChange={(e) => handleInputChange(product.id, 'sales', e.target.value)}
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
                placeholder="e.g., Updating prices for Q4 promotion"
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
