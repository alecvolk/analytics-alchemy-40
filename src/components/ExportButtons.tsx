import { FileDown, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/store/dashboardStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function ExportButtons() {
  const { exportData } = useDashboardStore();

  const handleExport = (format: 'csv' | 'png' | 'pdf') => {
    exportData(format);
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FileDown className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('png')}>
          <Image className="w-4 h-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
