import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete
}) => {
  return (
    <div className='bg-white border border-gray-300/400 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadowl-xl shadow-gray-100 relative group  '
    onClick={onSelect}>
      <div
      className='rounded-lg p-4 cursor-pointer relative'
      style={{
        background:colors.bgcolor
      }}
      >
<div className='flex items-start'>
<div className='flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4'>
<span className='text-lg font-semibold text-black'>
{getInitials(role)}
  </span>
</div>

{/*Content Container*/}
<div className='flex-grow'>
<div className='flex justify-between items-start'>
{/*Title and Skills*/}
<div>
  <h2 className='text-[17px] font-medium'>{role}</h2>
  <p className='text-x5 text-medium text-gray-900'>{topicsToFocus}</p>
</div>
</div>
</div>
</div>

<button
  className='absolute top-2 right-2 group-hover:flex hidden items-center gap-2 text-xs text-white font-medium bg-rose-500 px-2 py-1 rounded border border-rose-200 hover:border-rose-300 z-10'
  onClick={(e) => {
    e.stopPropagation();
    onDelete?.(); // Optional chaining to avoid error
  }}
>
  <LuTrash2 size={14} />
</button>
      </div>
<div className='px-3 pb-3'>
<div className='flex items-center gap-3 mt-4 '>
<div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
  Experience:{experience}{experience==1?"Year":"Years"}
</div>
<div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
{questions} Q&A
</div>
<div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
Last Updated :{lastUpdated}
</div>
</div>
{/*description*/}
<p className='text-[12px] text-gray-500 font-medium line-clamp-2 mt-3'>
  {description}
</p>
</div>
    </div>
  )
}

export default SummaryCard