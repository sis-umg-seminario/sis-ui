import Layout from "@/components/Layout";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const balanceItems = Array.from({ length: 6 }).map((_, index) => ({
  transactionId: index + 1,
  date: "2025-08-01",
  chargeAmount: "500.00",
  paymentAmount: "0.00",
  balanceAmount: "500.00",
  description: "Matrícula semestre agosto 2025",
  programId: 1,
  paymentType: "ENROLLMENT",
  authCode: 123456,
}));

export default function Balance() {
  const [openBalanceItem, setOpenBalanceItem] = useState<number | null>(null);

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">
          Estado de Cuenta
        </h1>
        <h1 className="text-2xl font-bold text-orange-600 text-center mb-2">
          Ingeniería en Sistemas
        </h1>
        <p className="text-center font-semibold text-gray-700">John Doe</p>
        <p className="text-center font-semibold text-green-700">
          Saldo: Q1000.00
        </p>
        <p className="text-center font-semibold text-green-700">SOLVENTE</p>

        <div className="mt-6 overflow-x-auto">
          {balanceItems.map((item, index) => (
            <div
              key={`balance-item-${index}`}
              className="mb-4 border rounded-xl shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenBalanceItem(
                    openBalanceItem === item.transactionId
                      ? null
                      : item.transactionId
                  )
                }
                className="flex justify-between w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-t-xl"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{`Fecha: ${item.date}`}</span>
                  <span className="font-semibold text-gray-800">{`Saldo: ${item.balanceAmount}`}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{`Cargo: ${item.chargeAmount}`}</span>
                  <span className="font-semibold text-gray-800">{`Abono: ${item.paymentAmount}`}</span>
                </div>
                {openBalanceItem === item.transactionId ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openBalanceItem === item.transactionId && (
                <div className="p-4">
                  <table className="table-fixed w-full text-left">
                    <thead>
                      <tr>
                        <th>Tipo de pago</th>
                        <th>Semestre</th>
                        <th>Descripción</th>
                        <th>Documento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.paymentType}</td>
                        <td>{item.programId}</td>
                        <td>{item.description}</td>
                        <td>{item.authCode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
