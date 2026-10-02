import React, { useState } from 'react';
import {
  Receipt,
  CreditCard,
  Search,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { useToast } from '../common/Toast';

export const FeesView = ({
  fees = [],
  onUpdateFees
}) => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Payment Modal State
  const [selectedFeeRecord, setSelectedFeeRecord] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Direct Bank Transfer');
  const [paymentRef, setPaymentRef] = useState('');

  // Calculations
  const totalReceivables = fees.reduce((acc, f) => acc + Number(f.totalAmount || 0), 0);
  const totalPaid = fees.reduce((acc, f) => acc + Number(f.paidAmount || 0), 0);
  const totalPending = fees.reduce((acc, f) => acc + Number(f.pendingAmount || 0), 0);
  const collectionRate = totalReceivables ? Math.round((totalPaid / totalReceivables) * 100) : 0;

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPaymentModal = (feeItem) => {
    setSelectedFeeRecord(feeItem);
    setPaymentAmount(String(feeItem.pendingAmount || ''));
    setPaymentRef(`TXN-${Date.now().toString().slice(-6)}`);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedFeeRecord) return;

    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      addToast('Please enter a valid positive payment amount.', 'error');
      return;
    }

    const newPaid = Number(selectedFeeRecord.paidAmount || 0) + amount;
    const newPending = Math.max(0, Number(selectedFeeRecord.totalAmount) - newPaid);
    const newStatus = newPending === 0 ? 'Paid' : 'Partial';

    const updatedFees = fees.map((f) => {
      if (f.id === selectedFeeRecord.id) {
        return {
          ...f,
          paidAmount: newPaid,
          pendingAmount: newPending,
          status: newStatus,
          lastPaymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return f;
    });

    onUpdateFees(updatedFees);
    addToast(
      `Payment of $${amount.toLocaleString()} recorded for ${selectedFeeRecord.studentName}!`,
      'success'
    );
    setSelectedFeeRecord(null);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Student Fee & Financial Ledger</h2>
          <p className="view-subheading">
            Track tuition fee structures, monitor outstanding balances, and issue payment receipts.
          </p>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Invoiced Amount</span>
            <div className="kpi-icon-box bg-indigo-subtle text-indigo">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">${totalReceivables.toLocaleString()}</span>
            <span className="kpi-tag neutral">Fall Term</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Collected</span>
            <div className="kpi-icon-box bg-emerald-subtle text-emerald">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-emerald">${totalPaid.toLocaleString()}</span>
            <span className="kpi-tag positive">{collectionRate}% Paid</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Outstanding Dues</span>
            <div className="kpi-icon-box bg-amber-subtle text-amber">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-amber">${totalPending.toLocaleString()}</span>
            <span className="kpi-tag highlight">Pending</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Collection Rate</span>
            <div className="kpi-icon-box bg-sky-subtle text-sky">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{collectionRate}%</span>
            <span className="kpi-tag positive">Target: 95%</span>
          </div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="filters-card">
        <div className="filter-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, ID or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-dropdowns-row">
          <div className="filter-select-group">
            <label>Payment Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid in Full</option>
              <option value="Partial">Partially Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course Program</th>
                <th>Total Fee</th>
                <th>Paid Amount</th>
                <th>Pending Balance</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((f) => (
                <tr key={f.id}>
                  <td>
                    <div className="cell-multiline">
                      <strong className="text-navy">{f.studentName}</strong>
                      <span className="font-mono text-xs font-bold text-muted">{f.studentId}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-multiline">
                      <span>{f.course}</span>
                      <span className="text-muted text-xs">{f.department}</span>
                    </div>
                  </td>
                  <td>
                    <strong>${Number(f.totalAmount).toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong className="text-success">${Number(f.paidAmount).toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong className={Number(f.pendingAmount) > 0 ? 'text-amber font-bold' : 'text-muted'}>
                      ${Number(f.pendingAmount).toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <span className="text-muted text-sm">{f.dueDate}</span>
                  </td>
                  <td>
                    <Badge
                      variant={
                        f.status === 'Paid'
                          ? 'success'
                          : f.status === 'Partial'
                          ? 'warning'
                          : f.status === 'Overdue'
                          ? 'danger'
                          : 'neutral'
                      }
                    >
                      {f.status}
                    </Badge>
                  </td>
                  <td className="text-right">
                    {f.status === 'Paid' ? (
                      <span className="badge badge-success badge-sm">Cleared</span>
                    ) : (
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleOpenPaymentModal(f)}
                      >
                        <CreditCard size={13} />
                        <span>Pay Fee</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedFeeRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedFeeRecord(null)}
          title={`Record Fee Payment - ${selectedFeeRecord.studentName}`}
          subtitle={`Student ID: ${selectedFeeRecord.studentId} • Pending Balance: $${selectedFeeRecord.pendingAmount.toLocaleString()}`}
          size="md"
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedFeeRecord(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRecordPayment}
              >
                Submit Payment Receipt
              </button>
            </>
          }
        >
          <form onSubmit={handleRecordPayment} className="form-grid">
            <div className="form-group">
              <label>Payment Amount ($) *</label>
              <input
                type="number"
                min="1"
                max={selectedFeeRecord.pendingAmount}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Check / Draft">Check / Bank Draft</option>
                  <option value="Campus Cash Desk">Campus Cash Desk</option>
                </select>
              </div>

              <div className="form-group">
                <label>Transaction Reference #</label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
