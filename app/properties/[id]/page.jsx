'use client';
import React from 'react'
import { fetchProperty } from '@/utils/requests';
import { useEffect,useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';

const PropetyPage = () => {
  const {id}= useParams();

  const [property,setProperty]=useState(null);
  const [loading,setLoading]=useState(null);

  useEffect(()=>{
    const fetchPropertyData=async()=>{
      if(!id) return;
      try{
        const property=await fetchProperty(id);
        setProperty(property);
      }
      catch(error){
        console.log('Error fetching property',error);
      }
      finally{
        setLoading(false);
      }
    }
    if(property===null){
      fetchPropertyData();
    }
  },[id,property]);

  if(!property && !loading){
    return (
      <h1 classNameNNameName='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    )
  }
  return (
    <>
    {loading && <Spinner loading={loading}/>}
    {!loading && property &&(<>
    <PropertyHeaderImage image={property.images[0]}/>
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="fas fa-arrow-left mr-2"/> Back to Properties
        </Link>
      </div>
    </section>

     <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          
          <PropertyDetails property={property}/>
          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">       
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <i className="fas fa-bookmark mr-2"></i> Bookmark Property
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <i className="fas fa-share mr-2"></i> Share Property
            </button>

            {/* <!-- Contact Form --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
              <form>
              <div classNameName='mb-4'>
                <label
                  classNameName='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                </label>
                <input
                  classNameName='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Enter your name'             
                  required
                />
              </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div classNameName='mb-4'>
                  <label
                    classNameName='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                  >
                    Phone:
                  </label>
                  <input
                    classNameName='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images}/>
    </>

    )}
    </>
  )
}

export default PropetyPage