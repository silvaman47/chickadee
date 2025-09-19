export default function Hero({ openBooking }) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-8 bg-black">
      <div className="w-full md:w-1/2">
        <h1 className="text-5xl font-bold mb-2">Healthy Chicken Is Waiting For You</h1>
        <p className="mb-4">Experience fresh, flavorful meals with a premium, uncluttered interface. Easy ordering, beautiful presentation, and top-quality ingredients.</p>
        <button onClick={openBooking} className="bg-blue-600 px-4 py-2 rounded">Book a Table</button>
      </div>
     
      <div className="grid grid-cols-2 gap-4 mt-8 w-full">
        <div className="bg-gray-900 p-4 rounded flex flex-col items-center">
          <img src="/chickensalad.jpg" alt="Salad" className="w-24 h-24 rounded-full mb-2" />
          <p>Fresh & Healthy Salad</p>
          <p className="text-red-600">$5.50</p>
          <p>4 items</p>
        </div>
        <div className="bg-gray-900 p-4 rounded flex flex-col items-center">
          <img src="/grilledchickenbreast.jpg" alt="Grilled Chicken" className="w-24 h-24 rounded-full mb-2" />
          <p>Grilled Herb Chicken</p>
          <p className="text-red-600">$6.90</p>
        </div>
      </div>
    </section>
  );
}