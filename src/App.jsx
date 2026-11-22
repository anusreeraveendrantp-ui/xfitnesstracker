import { useState, useEffect } from 'react';
import Header from './components/Header';
import HealthForm from './components/HealthForm';
import RecentStatistics from './components/RecentStatistics';
import WeeklyTrends from './components/WeeklyTrends';
import OverallData from './components/OverallData';

const STORAGE_KEY = 'healthAndFitness';

function App() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch {
        setRecords([]);
      }
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const openAddModal = () => {
    setEditRecord(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditRecord(null);
  };

  const handleSubmit = (formData) => {
    if (editRecord) {
      // Edit mode: update with map()
      const updated = records.map((r) =>
        r.id === editRecord.id ? { ...formData, id: editRecord.id } : r
      );
      setRecords(updated);
    } else {
      // Add mode
      const newRecord = {
        ...formData,
        id: Date.now().toString(),
      };
      setRecords([...records, newRecord]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
  };

  return (
    <>
      <Header onAddClick={openAddModal} />

      <div className="main-container">
        <RecentStatistics
          records={records}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
        <OverallData records={records} />
        <WeeklyTrends records={records} />
      </div>

      <HealthForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editRecord={editRecord}
      />
    </>
  );
}

export default App;
