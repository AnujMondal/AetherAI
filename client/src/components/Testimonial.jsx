import React from 'react'
import { dummyTestimonialData, assets } from '../assets/assets'

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'Nandini Kapil',
            title: 'Marketing Director, AetherAI',
            content: 'AetherAI has significantly improved our content workflow. The quality of the generated content is exceptional, saving us valuable time each week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Preet Kunwar',
            title: 'Content Creator, AetherAI',
            content: 'Using AetherAI has made our content creation process seamless. The AI tools enable us to produce high-quality content much faster than before.',
            rating: 5,
        },
        {
            image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'Abhijit Sahu',
            title: 'Content Writer, AetherAI',
            content: 'AetherAI has transformed how we approach content. The AI capabilities help us generate excellent content efficiently and effectively.',
            rating: 4,
        },
    ]

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_, i) => (
                                <img
                                    key={i}
                                    src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                                    className='w-4 h-4'
                                    alt="star"
                                />
                            ))}
                        </div>
                        <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial