import { FormEvent, FormEventHandler, useEffect, useState, Suspense } from "react"
import Image from 'next/image';
import clientPromise from 'lib/mongodb';
import {ObjectId} from 'mongodb';

export default async function Art({searchParams}: {
  searchParams: any;
}) {

  const client = await clientPromise;
	const collection = client.db('rng').collection('images');
  
  let art = await collection.findOne({_id: new ObjectId(searchParams.artId) })

  return (
    <div className="h-screen bg-background flex items-center justify-center flex-col text-white">
      <Suspense fallback={"loading..."}>
        <Image priority src={art.artUrl}  alt="AI art" width={512} height={512} />
      </Suspense>
    </div>
  )
}
