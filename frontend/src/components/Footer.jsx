import React from 'react'

const Footer = ({completedTasksCount,activeTasksCount}) => {
  return (
    <>
    {(completedTasksCount + activeTasksCount) > 0 && (
      <div className="text-center">
      <p className="text-sm text-muted-foreground text-center py-4">
      {completedTasksCount > 0 &&(
        <>
          Tuyệt vời - Bạn đã hoàn thành {completedTasksCount} nhiệm vụ!
          {activeTasksCount>0 && 
            ` Còn lại ${activeTasksCount} nhiệm vụ cần làm.`}
        </>
      )}
      {completedTasksCount===0 && activeTasksCount>0 &&(
        <>
          Bạn có {activeTasksCount} nhiệm vụ cần hoàn thành. Cố lên nhé!
        </>
      )}
      </p>
    </div>
    )}
  </>
  );
};


export default Footer