import React from "react";

const HomePage = ({ data, schedule, grades, attendance, payments }) => {
  const today = new Date().toISOString().split("T")[0];

  const filteredSchedule = schedule?.filter((item) => item.date === today);
  const filteredGrades = grades?.filter((item) => item.date === today);
  const filteredAttendance = attendance?.filter((item) => item.date === today);

  const missedCount =
    attendance?.filter((item) => !item.attendance).length || 0;
  const todayMissed =
    filteredAttendance?.filter((item) => !item.attendance).length || 0;

  return (
    <div className="container">
      <h1>👋 Привет, {data?.username}</h1>

      <div className="grid">
        {/* 📅 Расписание */}
        <div className="card">
          <h2>📅 Сегодня</h2>

          {filteredSchedule?.length > 0 ? (
            filteredSchedule.map((item) => (
              <div key={item.id} className="lesson-card">
                <h3>{item.subject}</h3>
                <p>👨‍🏫 {item.teacher}</p>
                <p>📍 Кабинет: {item.classroom}</p>
                <p>
                  {item.start_time} - {item.end_time}
                </p>
              </div>
            ))
          ) : (
            <p className="empty">😴 Сегодня нет расписания</p>
          )}
        </div>

        {/* 📊 Правая часть */}
        <div className="dashboard">
          {/* 📈 Оценки */}
          <div className="card">
            <h2>📈 Оценки (сегодня)</h2>

            {filteredGrades?.length > 0 ? (
              filteredGrades.map((item) => (
                <div key={item.id} className="grade-card">
                  <h3>{item.subject_name || item.subject}</h3>
                  <span>{item.grade}</span>
                  <p>{item.lesson_topic || "Без темы"}</p>
                </div>
              ))
            ) : (
              <p className="empty">Нет оценок</p>
            )}
          </div>

          {/* 📊 Посещаемость */}
          <div className="card">
            <h2>📊 Посещаемость</h2>

            <p>❌ Всего пропусков: {missedCount}</p>
            <p>📅 Сегодня пропусков: {todayMissed}</p>

            {filteredAttendance?.length > 0 ? (
              filteredAttendance.map((item) => (
                <div key={item.id} className="row">
                  <span>{item.subject_name}</span>
                  <span className={item.attendance ? "present" : "absent"}>
                    {item.attendance ? "✔ Был" : "✖ Отсутствовал"}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty">Нет данных за сегодня</p>
            )}
          </div>

          {/* 💰 Платежи (INDEX в React стиле) */}
          <div className="card">
            <h2>💰 Платежи</h2>

            {payments?.length > 0 ? (
              payments.map((item, index) => (
                <div key={item.id} className="payment-row">
                  <span>#{index + 1}</span>
                  <span>{item.student_name}</span>
                  <span>{item.month_display || item.month}</span>
                  <span>{item.date_pay}</span>
                  <span className={item.paid ? "paid" : "unpaid"}>
                    {item.paid ? "Оплачено" : "Не оплачено"}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty">Нет платежей</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
