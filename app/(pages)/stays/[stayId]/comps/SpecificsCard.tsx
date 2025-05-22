import { Card } from '@/components/ui/card'
import {Map, Hotel } from 'lucide-react'
import React from 'react'

interface SpecificsCardProps {
    title?: string;
    desc?: string;
}

const SpecificsCard: React.FC<SpecificsCardProps> = ({title, desc}) => {
  return (
    <Card className='px-4 py-4 gap-4 flex flex-col items-center justify-center'>
        <Map size={40}/>
        <div className='flex flex-col gap-1 items-center justify-center'>
        <span className='font-semibold'>{title}</span>
        <span className='text-center'>{desc}</span>
        </div>
    </Card>
  )
}

export default SpecificsCard