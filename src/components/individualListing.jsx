// import { useState, useEffect, useRef } from 'react';


// export default function IndividualListing() {
//   // State for all data from API
//   const [data, setData] = useState(null);
//   const [activeReview, setActiveReview] = useState(0);
//   const reviewContainerRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   // API CALL: Fetch all listing data on page load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // TODO: Replace with your actual API endpoint
//         // const response = await fetch('YOUR_API_ENDPOINT/listing/{id}');
//         // const result = await response.json();
//         // setData(result);

//         // Mock data
//         setData({
//           businessName: "Rakesh Plumbing Service",
//           rating: 4.5,
//           reviewCount: 25,
//           location: "Janakpuri, Delhi, India",
//           phoneNumber: "+91 XXXXXXXXXX",
//           contactPhone: "+91 92392xxxxx",
//           address: "Office No 104, 1st Floor, Plot No 518, Vijay bhawan colony, Near Indian Bank Colony, Sector 24, Vijay Nagar-110071",
//           serviceCharge: 250,
//           servicesCount: 50,
//           description: "Rakesh Plumbing Service provides professional plumbing solutions, specializing in fixing leaks, installing fixtures, and handling all types of plumbing emergencies for residential and commercial clients.",
//           services: [
//             { title: "Waste pipe replacement", description: "Remove damaged or leaking waste pipes and install new, durable piping to ensure smooth drainage." },
//             { title: "Tap installation", description: "Professional fitting of new taps with a secure, leak-free finish for kitchens, bathrooms, or outdoor areas." },
//             { title: "Connection hose installation", description: "Safe and precise setup of water inlet/outlet hoses for appliances or fixtures to prevent leaks and maintain steady flow." },
//             { title: "Flush tank replacement", description: "Replacement of old or faulty flush tanks with reliable, water-efficient units for better toilet performance." }
//           ],
//           reviews: [
//             { name: "Manish Sharma", date: "Sept 8, 2025", review: "Efficient and polite, he replaced the damaged sink pipe and ensured everything was working perfectly before leaving.", rating: 4.1 },
//             { name: "Nisha Maan", date: "Sept 12, 2025", review: "Quick and professional—he fixed my leaking sink pipe in no time and left everything spotless.", rating: 4.3 },
//             { name: "Vivek Singh", date: "Sept 8, 2025", review: "He diagnosed the issue fast, replaced the pipe smoothly, and my kitchen has been leak-free ever since.", rating: 4.1 }
//           ]
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Scroll to active review
//   useEffect(() => {
//     if (reviewContainerRef.current && data) {
//       const container = reviewContainerRef.current;
//       const scrollAmount = activeReview * 550; // 410px card + 140px gap
//       container.scrollTo({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   }, [activeReview, data]);

//   // Handle touch start
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   // Handle touch move
//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   // Handle touch end - detect swipe
//   const handleTouchEnd = () => {
//     if (!data) return;

//     const swipeThreshold = 50;
//     const diff = touchStartX.current - touchEndX.current;

//     if (Math.abs(diff) > swipeThreshold) {
//       if (diff > 0) {
//         // Swiped left - go to next
//         setActiveReview(prev => Math.min(prev + 1, data.reviews.length - 1));
//       } else {
//         // Swiped right - go to previous
//         setActiveReview(prev => Math.max(prev - 1, 0));
//       }
//     }
//   };

//   // API CALL: Book now button handler
//   const handleBookNow = async () => {
//     try {
//       // TODO: Replace with your actual API endpoint
//       // await fetch('YOUR_API_ENDPOINT/booking', {
//       //   method: 'POST',
//       //   body: JSON.stringify({ listingId: data.id })
//       // });
//       alert('Book Now API call here');
//     } catch (error) {
//       console.error('Error booking:', error);
//     }
//   };

//   if (!data) return <div className="bg-white size-full flex items-center justify-center"><p>Loading...</p></div>;

//   return (
//     <div className="bg-white relative size-full justify-center align-center" style={{ minHeight: '2032px' }}>
//       {/* Header Image */}
//       <div className="absolute h-[160px] left-[60px] overflow-clip rounded-tl-[32px] rounded-tr-[32px] top-[40px] w-[1500px]">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[32px] rounded-tr-[32px]">
//           <img alt="" className="absolute h-[500.06%] left-0 max-w-none top-[-150.32%] w-full bg-[#0f0f0f]" src="" />
//         </div>
//         <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0)] h-[160px] left-0 mix-blend-overlay rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] to-[rgba(255,152,0,0.16)] top-0 w-[1200px]" />
//       </div>

//       {/* Main Info Card */}
//       <div className="absolute bg-white h-[242px] left-[60px] rounded-bl-[32px] rounded-br-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[200px] w-[1500px]">
//         {/* Business Name */}
//         <div className="absolute content-stretch flex gap-[8px] items-center left-[32px] top-[32px]">
//           <div className="h-[33.6px] relative shrink-0 w-[42px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 34">
//               <g clipPath="url(#clip0_1_682)">
//                 <path fill="black" />
//               </g>
//               <defs>
//                 <clipPath id="clip0_1_682">
//                   <rect fill="white" height="33.6" width="42" />
//                 </clipPath>
//               </defs>
//             </svg>
//           </div>
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '28px' }}>{data.businessName}</p>
//         </div>

//         {/* Rating */}
//         <div className="absolute bg-[#fffae0] box-border content-stretch flex items-center left-[32px] px-[16px] py-[8px] rounded-[16px] top-[82px]">
//           <div aria-hidden="true" className="absolute border-2 border-[gold] border-solid inset-[-2px] pointer-events-none rounded-[18px]" />
//           <div className="relative shrink-0 size-[30px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
//               <path fill="#FFD700" />
//             </svg>
//           </div>
//           <p className="font-['Poppins:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[rgba(0,0,0,0.75)] text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>{data.rating} ({data.reviewCount} reviews)</p>
//         </div>

//         {/* Location */}
//         <div className="absolute bg-[#f6d4ff] box-border content-stretch flex items-center left-[264px] px-[16px] py-[8px] rounded-[16px] top-[82px]">
//           <div aria-hidden="true" className="absolute border-2 border-[#ea00ff] border-solid inset-[-2px] pointer-events-none rounded-[18px]" />
//           <div className="relative shrink-0 size-[30px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
//               <path fill="#EA00FF" />
//             </svg>
//           </div>
//           <p className="font-['Poppins:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[rgba(0,0,0,0.75)] text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>{data.location}</p>
//         </div>

//         {/* Phone Number */}
//         <div className="absolute content-stretch flex gap-[16px] items-center left-[32px] top-[152px]">
//           <div className="bg-[#caecff] box-border content-stretch flex items-center px-[16px] py-[8px] relative rounded-[16px] shrink-0">
//             <div aria-hidden="true" className="absolute border-2 border-[#10125f] border-solid inset-[-2px] pointer-events-none rounded-[18px]" />
//             <div className="relative shrink-0 size-[30px]">
//               <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
//                 <path fill="#10125F" />
//               </svg>
//             </div>
//             <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '16px' }}>{data.phoneNumber}</p>
//           </div>

//           <div className="bg-[#e1ffc0] box-border content-stretch flex items-center px-[16px] py-[8px] relative rounded-[16px] shrink-0">
//             <div aria-hidden="true" className="absolute border-2 border-[#14ae5c] border-solid inset-[-2px] pointer-events-none rounded-[18px]" />
//             <div className="relative shrink-0 size-[30px]">
//               <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
//                 <path clipRule="evenodd" fill="#14AE5C" fillRule="evenodd" />
//               </svg>
//             </div>
//             <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '16px' }}>WhatsApp</p>
//           </div>

//           <div className="relative shrink-0 size-[46px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
//               <path fill="black" opacity="0.3" />
//               <path fill="black" opacity="0.3" />
//               <path fill="black" opacity="0.3" />
//               <path fill="black" />
//             </svg>
//           </div>
//         </div>

//         {/* Book Now Button */}
//         <div 
//           onClick={handleBookNow}
//           className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[1013px] px-[16px] py-[12px] rounded-[36px] top-[91px] cursor-pointer"
//         >
//           <div aria-hidden="true" className="absolute border-2 border-[#ff9800] border-solid inset-0 pointer-events-none rounded-[36px]" />
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ff9800] text-nowrap whitespace-pre" style={{ fontSize: '24px' }}> Book now</p>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[120px] px-[8px] py-0 top-[466px]">
//         <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>Services</p>
//       </div>
//       <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(8.333%+126px)] px-[8px] py-0 top-[466px]">
//         <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>Reviews</p>
//       </div>
//       <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(16.667%+132px)] px-[8px] py-0 top-[466px]">
//         <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>Quick Info</p>
//       </div>

//       {/* Service Cards */}
//       <div className="absolute bg-white h-[400px] left-[120px] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[520px] w-[384px]">
//         <div className="absolute h-[196px] left-1/2 rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] top-0 translate-x-[-50%] w-[384px]">
//           <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[32px] rounded-tr-[32px] size-full" src="" />
//         </div>
//         <p className="absolute font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic text-black text-nowrap whitespace-pre left-[16px] top-[212px]" style={{ fontSize: '20px' }}>{data.services[0].title}</p>
//       </div>

//       <div className="absolute bg-white h-[400px] left-[calc(33.333%+48px)] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[520px] w-[384px]">
//         <div className="absolute h-[196px] left-0 rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] top-0 w-[384px]">
//           <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[32px] rounded-tr-[32px] size-full" src="" />
//         </div>
//         <p className="absolute font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic text-black text-nowrap left-[16px] top-[212px] whitespace-pre" style={{ fontSize: '20px' }}>{data.services[1].title}</p>
//       </div>

//       <div className="absolute bg-white h-[400px] left-[120px] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[944px] w-[384px]">
//         <div className="absolute h-[196px] left-0 rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] top-0 w-[384px]">
//           <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[32px] rounded-tr-[32px] size-full" src="" />
//         </div>
//         <p className="absolute font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic text-black text-nowrap top-[212px] whitespace-pre left-[16px]" style={{ fontSize: '20px' }}>{data.services[2].title}</p>
//       </div>

//       <div className="absolute bg-white h-[400px] left-[calc(33.333%+48px)] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[944px] w-[384px]">
//         <div className="absolute h-[196px] left-0 rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] top-0 w-[384px]">
//           <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[32px] rounded-tr-[32px] size-full" src="" />
//         </div>
//         <p className="absolute font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic text-black text-nowrap top-[212px] whitespace-pre left-[16px]" style={{ fontSize: '20px' }}>{data.services[3].title}</p>
//       </div>

//       {/* Contact & Address Card */}
//       <div className="absolute bg-white h-[824px] left-[calc(66.667%-24px)] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[520px] w-[384px]">
//         <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] top-[24px] w-[336px]">
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black w-full" style={{ fontSize: '24px' }}>Contact</p>
//           <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
//             <div className="relative shrink-0 size-[30px]">
//               <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 353 473">
//                 <path fill="#3F7AE8" />
//                 <path d="M0.375 54L352.375 54" stroke="black" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="0.75" />
//                 <path d="M0.375 304L352.375 304" stroke="black" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="0.75" />
//                 <path d="M0.375 388L352.375 388" stroke="black" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="0.75" />
//                 <path d="M0.375 472L352.375 472" stroke="black" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="0.75" />
//               </svg>
//             </div>
//             <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>{data.contactPhone}</p>
//           </div>
//         </div>

//         <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] top-[146px] w-[336px]">
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black" style={{ fontSize: '24px' }}>Address</p>
//           <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black w-[336px]" style={{ fontSize: '20px' }}>{data.address}</p>
//           <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
//             <div className="relative shrink-0 size-[30px]">
//               <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
//                 <path fill="#3F7AE8" />
//                 <path fill="#3F7AE8" />
//               </svg>
//             </div>
//             <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '20px' }}>Get Directions</p>
//           </div>
//         </div>

//         <div className="absolute content-stretch flex gap-[4px] items-center left-[24px] top-[396px] w-[336px]">
//           <div className="relative shrink-0 size-[36px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
//               <path fill="#3F7AE8" />
//             </svg>
//           </div>
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '24px' }}>Send Enquiry by Email</p>
//         </div>

//         <div className="absolute content-stretch flex gap-[4px] items-center left-[24px] top-[480px] w-[320px]">
//           <div className="relative shrink-0 size-[36px]">
//             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
//               <path fill="#3F7AE8" />
//             </svg>
//           </div>
//           <p className="font-['Poppins:SemiBold',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '24px' }}>Visit our Website</p>
//         </div>

//         <div className="absolute content-stretch flex gap-[4px] items-center left-[24px] top-[564px] w-[336px]">
//           <p className="basis-0 font-['Poppins:SemiBold',_sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-black">
//             <span style={{ fontSize: '24px' }}>Average Service Charge<br /></span>
//             <span style={{ fontSize: '20px' }}>(Rs: {data.serviceCharge})</span>
//           </p>
//         </div>
//       </div>

//       {/* Reviews Section - DOT CONTROLLED & SWIPEABLE */}
//       <div className="absolute bg-white h-[428px] left-[120px] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[1368px] w-[792px]">
//         <p className="absolute font-['Poppins:SemiBold',_sans-serif] leading-[normal] left-[40px] not-italic text-black text-nowrap top-[40px] whitespace-pre" style={{ fontSize: '24px' }}>Reviews</p>

//         {/* Scrollable container - controlled by dots and swipe */}
//         <div 
//           ref={reviewContainerRef}
//           className="absolute left-1/2 top-[84px] translate-x-[-50%] w-[550px] h-[288px] overflow-x-hidden"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div className="flex gap-[140px] items-center transition-transform duration-300" style={{ transform: `translateX(-${activeReview * 550}px)` }}>
//             {data.reviews.map((review, index) => (
//               <div key={index} className="h-[288px] overflow-clip relative rounded-[32px] shrink-0 w-[410px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 410 288\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(11.2 11.35 -16.158 15.944 29 30.5)\\'><stop stop-color=\\'rgba(198,159,250,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(227,207,252,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
//                 <div className="absolute content-stretch flex flex-col h-[39px] items-start leading-[normal] not-italic right-[231px] text-black top-[32px]">
//                   <p className="font-['Poppins:Bold',_sans-serif] relative shrink-0 text-nowrap whitespace-pre" style={{ fontSize: '18px' }}>{review.name}</p>
//                   <p className="font-['Poppins:Regular',_sans-serif] min-w-full relative shrink-0 w-[min-content]" style={{ fontSize: '8px' }}>{review.date}</p>
//                 </div>
//                 <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-1/2 top-[95px] translate-x-[-50%]">
//                   <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black w-[346px]" style={{ fontSize: '16px' }}>"{review.review}"</p>
//                 </div>
//                 <div className="absolute content-stretch flex h-[24px] items-center left-[calc(50%+151.5px)] top-[40px] translate-x-[-50%]">
//                   <div className="relative shrink-0 size-[24px]">
//                     <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 16">
//                       <path fill="#FFD700" />
//                     </svg>
//                   </div>
//                   <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-black text-nowrap whitespace-pre" style={{ fontSize: '16px' }}>{review.rating}</p>
//                 </div>
//                 <div className="absolute inset-0 pointer-events-none shadow-[2px_2px_24px_2px_inset_rgba(0,0,0,0.16),-2px_-2px_24px_2px_inset_rgba(0,0,0,0.16)]" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation dots - CLICKABLE */}
//         <div className="absolute content-stretch flex gap-[8px] items-center left-1/2 top-[380px] translate-x-[-50%]">
//           {data.reviews.map((_, index) => (
//             <div 
//               key={index}
//               onClick={() => setActiveReview(index)}
//               className={`overflow-clip relative rounded-[16px] shrink-0 cursor-pointer transition-all ${
//                 activeReview === index 
//                   ? 'bg-black h-[16px] w-[32px]' 
//                   : 'bg-[rgba(0,0,0,0.25)] size-[16px]'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Services Count Card */}
//       <div className="absolute h-[428px] left-[calc(66.667%-24px)] overflow-clip rounded-[40px] top-[1368px] w-[384px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 384 428\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-47.646 52.328 -51.891 -48.048 363.79 11.719)\\'><stop stop-color=\\'rgba(255,216,143,1)\\' offset=\\'0.15\\'/><stop stop-color=\\'rgba(255,195,107,0.77)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(255,174,71,0.54)\\' offset=\\'0.2\\'/><stop stop-color=\\'rgba(255,153,36,0.31)\\' offset=\\'0.225\\'/><stop stop-color=\\'rgba(255,132,0,0.08)\\' offset=\\'0.25\\'/></radialGradient></defs></svg>')" }}>
//         <p className="absolute font-['Poppins:SemiBold',_sans-serif] leading-[99.965%] left-[192px] not-italic text-black text-center text-nowrap top-[135px] translate-x-[-50%] whitespace-pre">
//           <span className="text-[#ff9800]" style={{ fontSize: '72px' }}>{data.servicesCount}+</span>
//           <span style={{ fontSize: '30px' }}><br />Services done</span>
//         </p>
//       </div>

//       {/* Quick Info */}
//       <div className="absolute bg-white h-[188px] left-[120px] overflow-clip rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] top-[1820px] w-[1200px]">
//         <p className="absolute font-['Poppins:Regular',_sans-serif] leading-[normal] left-[40px] not-italic text-black top-[100px] w-[1055px]" style={{ fontSize: '16px' }}>{data.description}</p>
//       </div>

//       {/* Close Button */}
//       <div className="absolute left-[calc(100%-74px)] size-[50px] top-[24px]">
//         <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
//           <g filter="url(#filter0_d_1_645)">
//             <rect fill="white" height="50" rx="25" shapeRendering="crispEdges" width="50" x="25" y="17" />
//             <rect height="51" rx="25.5" shapeRendering="crispEdges" stroke="#FF9800" width="51" x="24.5" y="16.5" />
//             <path d="M62 54L38 30M62 30L38 54" stroke="#FF9800" strokeLinecap="round" strokeWidth="2" />
//           </g>
//           <defs>
//             <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="100" id="filter0_d_1_645" width="100" x="0" y="0">
//               <feFlood floodOpacity="0" result="BackgroundImageFix" />
//               <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
//               <feOffset dy="8" />
//               <feGaussianBlur stdDeviation="12" />
//               <feComposite in2="hardAlpha" operator="out" />
//               <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.596078 0 0 0 0 0 0 0 0 0.25 0" />
//               <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_645" />
//               <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_645" mode="normal" result="shape" />
//             </filter>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   );
// }


import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Thynk from '../assets/Thynk.jpg';
import Thynk1 from "../assets/Thynk1.jpg";
import { Star, MapPin, Phone, Share2, X, Mail, Globe, Navigation } from 'lucide-react';
import BookNow from './bookNow';
import api from './api';


const IndividualListing = ({ listingData }) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState('Services');
  const reviewsScrollRef = useRef(null);
  const [activeReviewDot, setActiveReviewDot] = useState(0);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([]);
  const [completedServices, setCompleteServices] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [avgRatingCount, setAvgRatingCount] = useState(0);
  const [bname, setBName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [avgPricing, setAvgPricing] = useState(0);
  const [book, setBook] = useState(false);
  const [drop, setDrop] = useState([]);



  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");

    // if (!storedUser) return;

    const info = async () => {

      const res = await api.get(`/provider/${id}`);
      const res1 = await api.get(`/provider/service-count/${id}`);
      const res2 = await api.get(`/feedback/averagefeedback/${id}`);
      const res3 = await api.get(`/feedback/${id}`);


      console.log(res?.data);
      console.log(res1?.data);
      console.log(res2?.data);
      console.log(res3?.data);



      setPhone(res?.data?.phoneno);
      setAddress(res?.data?.address);
      setServices(res?.data?.services);
      setBName(res?.data?.business_name);
      setEmail(res?.data?.email)
      setWebsite(res?.data?.website)
      setAvgPricing(res?.data?.average_pricing);
      setCompleteServices(res1?.data?.completedServices);
      setAvgRating(res2?.data?.averageRating);
      setAvgRatingCount(res2?.data?.count);
      setFeedbacks(res3?.data?.feedbacks);


    }

    info();


  }, []);


  const handleBook = async () => {



    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");

    if (!storedUser) {
      alert("Please Login / Sign Up first to Book a service");
      return;
    }

    const res = await api.get(`/booknow/provider/${id}`);

    console.log(res?.data);
    window.open(res?.data?.whatsAppURL, '_blank', 'noopener,noreferrer');

  }


  // const data = listingData || {
  //   businessName: 'Rakesh Plumbing Service',
  //   rating: 4.5,
  //   reviewCount: 25,
  //   location: 'Janakpuri, Delhi, India',
  //   phone: '+91 XXXXXXXXXX',
  //   whatsapp: '+91 XXXXXXXXXX',
  //   bannerImage: 'https://images.pexels.com/photos/8486888/pexels-photo-8486888.jpeg?auto=compress&cs=tinysrgb&w=1200',
  //   services: [
  //     {
  //       id: 1,
  //       title: 'Waste pipe replacement',
  //       description: 'Remove damaged or leaking waste pipes and install new, durable piping to ensure smooth drainage.',
  //       image: 'https://images.pexels.com/photos/6419127/pexels-photo-6419127.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     },
  //     {
  //       id: 2,
  //       title: 'Tap installation',
  //       description: 'Professional fitting of new taps with a secure, leak-free finish for kitchens, bathrooms, or outdoor areas.',
  //       image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     },
  //     {
  //       id: 3,
  //       title: 'Connection hose installation',
  //       description: 'Safe and precise setup of water inlet/outlet hoses for appliances or fixtures to prevent leaks and maintain steady flow.',
  //       image: 'https://images.pexels.com/photos/8486206/pexels-photo-8486206.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     },
  //     {
  //       id: 4,
  //       title: 'Flush tank replacement',
  //       description: 'Replacement of old or faulty flush tanks with reliable, water-efficient units for better toilet performance.',
  //       image: 'https://images.pexels.com/photos/4239153/pexels-photo-4239153.jpeg?auto=compress&cs=tinysrgb&w=600'
  //     }
  //   ],
  //   contact: {
  //     phone: '+91 92392xxxxx',
  //     address: 'Office No 104, 1st Floor, Plot No 518, Vijay bhawan colony, Near Indian Bank Colony, Sector 24, Vijay Nagar-110071'
  //   },
  //   averageCharge: 250,
  //   servicesCount: 50,
  //   reviews: [
  //     {
  //       id: 1,
  //       name: 'Nisha Maan',
  //       date: 'Sept 19, 2025',
  //       rating: 4.3,
  //       comment: 'Quick and professional—he fixed my leaking sink pipe in no time and left everything spotless.'
  //     },
  //     {
  //       id: 2,
  //       name: 'Rajesh Kumar',
  //       date: 'Sept 15, 2025',
  //       rating: 4.5,
  //       comment: 'Excellent service! Very professional and completed the work on time.'
  //     },
  //     {
  //       id: 3,
  //       name: 'Priya Sharma',
  //       date: 'Sept 10, 2025',
  //       rating: 4.8,
  //       comment: 'Highly recommended! Great work and very reasonable pricing.'
  //     }
  //   ],
  //   description: 'Rakesh Plumbing Service provides professional plumbing solutions, specializing in fixing leaks, installing fixtures, and handling all types of plumbing emergencies for residential and commercial clients.'
  // };

  const scrollToReview = (index) => {
    if (reviewsScrollRef.current) {
      const reviewWidth = reviewsScrollRef.current.scrollWidth / feedbacks.length;
      reviewsScrollRef.current.scrollTo({
        left: reviewWidth * index,
        behavior: 'smooth'
      });
      setActiveReviewDot(index);
    }
  };

  const handleReviewScroll = () => {
    if (reviewsScrollRef.current) {
      const scrollLeft = reviewsScrollRef.current.scrollLeft;
      const reviewWidth = reviewsScrollRef.current.scrollWidth /feedbacks.length;
      const currentIndex = Math.round(scrollLeft / reviewWidth);
      setActiveReviewDot(currentIndex);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-32 sm:h-40">
        <img
          src={Thynk}
          alt={bname}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 opacity-90"></div>

  {/* Centered Quote Text */}
  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-semibold italic">
      “Mendora Services That Make Life Easy.”
    </h1>
    <p className="text-white font-semibold text-sm sm:text-lg mt-2">
      Small Repairs to Big Care  Mendora Has You Covered
    </p>
  </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">

              <h1 className="text-xl sm:text-2xl font-bold text-gray-600">{bname}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-[5px]">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm text-gray-900">{avgRating}</span>
                <span className="text-xs font-semibold text-gray-600">( {avgRatingCount} reviews )</span>
              </div>
              {/* <div className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-xs font-medium text-gray-900">{data.location}</span>
              </div> */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-green-300 rounded-[5px] bg-green-50 transition text-sm">
                  <Phone className="w-3.5 h-3.5 text-green-700" />
                  <span className="font-semibold text-green-900">{phone}</span>
                </button>
              </div>
            </div>

            {/* <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm">
                <Phone className="w-3.5 h-3.5 text-gray-700" />
                <span className="font-medium text-gray-900">{data.phone}</span>
              </button>
            </div> */}
          </div>

          <button 
          // className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition text-sm whitespace-nowrap self-start"
          className="bg-gradient-to-r from-[#FFC727] to-[#FF9800] 
                            text-gray-600 text-[12px] px-8 py-3 rounded-[5px] font-semibold hover:text-white bg-gray-600 transition"
            onClick={
              () => {

                if (!user) {
                  alert("Please Log In/Sign Up for Booking a Service");
                  return;
                }
                setBook(true);
                setDrop(services);


              }}
          >
            Book now
          </button>
          {book && <BookNow businessName={bname} onClose={() => {
            setBook(false);
          }} services={drop} id={id} />}
        </div>

        <div className="flex gap-6 sm:gap-8 border-b border-gray-200 mb-5">
          {['Services', 'Reviews', 'Quick Info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 font-semibold text-sm transition relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-5 lg:gap-6">
          <div>
            {activeTab === 'Services' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {services.map((service) => (
                  <div key={service._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col shadow-sm">
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                      <img
                        src={service.serviceImage || Thynk1}

                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 mb-2">
                      {service.serviceName}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div>
                {/* <h2 className="text-xl font-bold text-gray-900 mb-5">Reviews</h2> */}

                <div className="relative">
                  <div
                    ref={reviewsScrollRef}
                    onScroll={handleReviewScroll}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {feedbacks.map((review, id) => (
                      <div
                        key={id}
                        className="flex-shrink-0 w-full sm:w-[85%] snap-center h-[170px]"
                      >
                        <div className="bg-gradient-to-br from-amber-200 via-purple-200 to-purple-200 rounded-3xl p-6 h-[170px] shadow-sm">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-base text-gray-900">
                                {review.customerName}
                              </h3>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {review.createdAt}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-sm text-gray-900">
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-xl text-gray-800 leading-relaxed">
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-1.5 mt-5">
                    {feedbacks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToReview(index)}
                        className={`h-2 rounded-full transition-all ${index === activeReviewDot
                          ? 'w-6 bg-gray-400'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Quick Info' && (
              <div className="bg-gradient-to-br from-amber-100 via-amber-200 to-yellow-200 rounded-3xl p-12 shadow-sm">
                <p className="text-xl text-gray-600 leading-relaxed font-semibold">
                  Mendora is your trusted platform for connecting with verified and background-checked professionals who meet the highest quality standards. Our top-rated service providers have earned consistent praise from satisfied customers for their expertise and reliability. With flexible scheduling options, Mendora makes it easy to book appointments at your convenience, ensuring a seamless and stress-free experience every time !!
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-md md:max-w-lg mx-auto">
              <h3 className="font-bold text-base text-gray-900 mb-4 text-center md:text-left">
                Contact
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                <span className="text-sm text-gray-900 break-all text-center sm:text-left">
                  {phone}
                </span>
              </div>

              <h3 className="font-bold text-base text-gray-900 mb-2 text-center md:text-left">
                Address
              </h3>

              <div className="flex flex-wrap items-center gap-2 mb-5 justify-center md:justify-start">
                <p className="text-xs text-gray-700 leading-relaxed mb-3 text-center md:text-left break-words w-full">
                  {address}
                </p>
              </div>

              <button
                className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition mb-3 text-sm"
                onClick={() => (window.location.href = `mailto:${email}`)}
              >
                <Mail className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <span className="font-medium text-gray-900 text-center sm:text-left">
                  Send Enquiry by Email
                </span>
              </button>

              <button
                className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                onClick={() => window.open(website, "_blank")}
              >
                <Globe className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <span className="font-medium text-gray-900 text-center sm:text-left">
                  Visit our Website
                </span>
              </button>
            </div>


            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 mb-2">
                Average Service Charge
              </h3>
              <p className="text-gray-700 font-semibold text-sm">
                (Rs: {avgPricing})
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-6xl font-bold text-orange-500 mb-1">
                {completedServices}+
              </div>
              <p className="text-lg font-bold text-gray-900">Services done</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default IndividualListing;
