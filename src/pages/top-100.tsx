import { useState } from 'react';

import { useQuery } from '@apollo/client';

import Card from '@/components/molecules/Card';
import Filters from '@/components/molecules/Filters';
import Loading from '@/components/molecules/Loading';
import { GET_PROCEDURES } from '@/queries/get-procedures';

export default function Example() {
  const [selectedSubject, setSelectedSubject] = useState([
    'Arbeit und Beschäftigung',
  ]);
  const [selectedType, setSelectedType] = useState(['Antrag']);

  const { loading, data } = useQuery(GET_PROCEDURES, {
    variables: {
      filter: {
        subjectGroups: selectedSubject,
        type: selectedType,
      },
      listTypes: ['PAST'],
      pageSize: 15,
      sort: 'voteDate',
    },
  });

  return (
    <div>
      <div className="bg-gray-200">
        <div className="mx-auto max-w-7xl px-4 pb-7 pt-28 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Vergangen
          </h1>
          <p className="max-w-xl text-sm text-gray-600">
            Hier siehst Du alle bereits abgestimmten Vorgänge
          </p>
        </div>
        <Filters
          selected={[...selectedSubject, ...selectedType] as never}
          onToggle={(group: string, id: string) => {
            if (group === 'subject') {
              if (selectedSubject.includes(id)) {
                // remove
                setSelectedSubject(selectedSubject.filter((s) => s !== id));
              } else {
                // add
                setSelectedSubject([...selectedSubject, id]);
              }
            } else if (selectedType.includes(id)) {
              // remove
              setSelectedType(selectedType.filter((s) => s !== id));
            } else {
              // add
              setSelectedType([...selectedType, id]);
            }
          }}
          onReset={() => {
            setSelectedType([]);
            setSelectedSubject([]);
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="3xl:grid-cols-4 mx-auto mt-6 grid h-full max-w-md gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Loading />
          ) : (
            data.procedures.map((item: { procedureId: any }) => (
              <Card item={item as any} key={item.procedureId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
