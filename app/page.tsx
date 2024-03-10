import ReservationForm from '@/app/components/ReservationForm';

export default async function Home() {
  return (
      <main className="flex flex-col content-start p-5">
        <section>
          <h1>Car rental example</h1>
        </section>
        <ReservationForm/>
      </main>
  );
}
