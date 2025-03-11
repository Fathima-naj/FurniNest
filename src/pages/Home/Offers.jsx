import React from 'react';
import { Link } from 'react-router-dom';

function Offers() {
  const offerData = [
    {
      link: '/category/bed',
      image: 'https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/Solidwoodbeds/solidwoodbeds_WSWB7860STUDIW/solidwoodbeds_WSWB7860STUDIW_3.jpg?tr=w-1200',
      title: 'Bed',
    },
    {
      link: '/category/sofa',
      image: 'https://ik.imagekit.io/2xkwa8s1i/img/sofa-sets/Recliner/WRCLMSRM1LMBS/3.jpg?tr=w-1200',
      title: 'Sofa',
    },
    {
      link: '/category/furnishing',
      image: 'https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/CURTAINS-PRINTED/WCURPRTWRBYS2/WCURPRTWRBYS2_LS_2.jpg?tr=w-1200',
      title: 'Furnishing',
    },
    {
      link: '/category/home decor',
      image: 'https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/Mirror_image/WFMIRHNBKBR60/WFMIRHNBKBR60_WB_02.jpg?tr=w-256',
      title: 'Home Decor',
    },
    {
      link: '/category/table',
      image: 'https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/WMCF_Image/WMCFTFLATR1/WMCFTFLATR1_2.jpg?tr=w-1200',
      title: 'Table',
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 px-5 py-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>

     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl">
        {offerData.map((offer) => (
          <Link
            key={offer.link}
            to={offer.link}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 sm:h-52 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-white text-lg font-semibold">{offer.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Offers;
