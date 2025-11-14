import { type AccountStatementResponse } from "@/types/students/accountStatement";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    data: AccountStatementResponse;
}

export default function AccountStatementDetail({ data }: Props) {
    const isSolvente = data.status === 'SOLVENTE';

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Estado de Cuenta</CardTitle>
                <p className="text-muted-foreground">{data.program}</p>
                <div className="!mt-4 pt-4 border-t">
                    <p className="font-semibold">{data.Name}</p>
                    <p>Saldo: <span className="font-bold">{data.currency} {data.totals.balance.toFixed(2)}</span></p>
                    <Badge variant={isSolvente ? 'default' : 'destructive'} className={`mt-2 ${isSolvente ? 'bg-green-600' : ''}`}>
                        {data.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {data.items.map((item) => (
                        <AccordionItem value={`item-${item.transactionId}`} key={item.transactionId}>
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4 text-sm">
                                    <div>
                                        <p>Fecha: {item.date}</p>
                                        <p>Saldo: {item.amount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>Cargo: {item.type === 'CARGO' ? item.amount.toFixed(2) : '0.00'}</p>
                                        <p>Abono: {item.type === 'ABONO' ? item.amount.toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p><span className="font-semibold">Tipo de pago:</span> {item.paymentType}</p>
                                    <p><span className="font-semibold">Semestre:</span> {data.period.academicTerm}</p>
                                    <p><span className="font-semibold">Descripción:</span> {item.description}</p>
                                    <p><span className="font-semibold">Documento:</span> {item.document}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}