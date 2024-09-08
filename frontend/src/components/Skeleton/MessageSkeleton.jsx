import React from 'react';

const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="skeleton h-10 w-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-end">
        <div className='flex flex-col gap-1'>
          <div className="skeleton h-4 w-40"></div>
        </div>
        <div className="skeleton h-10 w-10 rounded-full shrink-0"></div>
      </div>
    </>
  );
};

export default MessageSkeleton;
