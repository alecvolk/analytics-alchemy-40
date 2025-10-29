import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText } from 'lucide-react';

export default function AuditLog() {
  const { auditLogs } = useDashboardStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit Log</h1>
        <p className="text-muted-foreground">Track all changes made to your data</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Change History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No changes recorded yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Changes made through the admin panel will appear here
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Old Value</TableHead>
                    <TableHead>New Value</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.field}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {String(log.oldValue)}
                      </TableCell>
                      <TableCell className="font-medium text-primary">
                        {String(log.newValue)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs">
                        {log.reason || '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
