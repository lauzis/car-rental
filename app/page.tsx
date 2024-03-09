import ReservationForm from '@/app/components/ReservationForm';

export default async function Home() {
  return (
      <main className="flex flex-col content-start p-24">
        <section>
          <h1>Car rental example</h1>
        </section>
        <ReservationForm/>
      </main>
  );
}
