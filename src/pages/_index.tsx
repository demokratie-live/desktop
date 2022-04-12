import { useState } from 'react';

import { useQuery } from '@apollo/client';

import Card from '@/components/molecules/Card';
import FilterDropdown from '@/components/molecules/FilterDropdown';
import Loading from '@/components/molecules/Loading';
import { Meta } from '@/layout/Meta';
import { GET_PROCEDURES } from '@/queries/get-procedures';
import { Main } from '@/templates/Main';

// const SEARCH_PROCEDURES = gql`
//   query search($term: String!) {
//     searchProceduresAutocomplete(term: $term) {
//       procedures {
//         title
//         procedureId
//         type
//         votes
//         communityVotes {
//           yes
//           no
//           abstination
//           __typename
//         }
//         currentStatus
//         voteDate
//         voteResults {
//           yes
//           no
//           abstination
//           notVoted
//           namedVote
//           partyVotes {
//             main
//             __typename
//           }
//           __typename
//         }
//         subjectGroups
//         __typename
//       }
//       autocomplete
//       __typename
//     }
//   }
// `;

const Index = () => {
  /* const router = useRouter(); */

  const [sort, setSort] = useState('voteDate');
  // const [searchTerm, setSearchTerm] = useState(null);

  const { loading, error, data } = useQuery(GET_PROCEDURES, {
    variables: {
      filter: {
        subjectGroups: [
          'Arbeit und Beschäftigung',
          'Ausländerpolitik, Zuwanderung',
          'Außenpolitik und internationale Beziehungen',
          'Außenwirtschaft',
          'Bildung und Erziehung',
          'Bundestag',
          'Energie',
          'Entwicklungspolitik',
          'Europapolitik und Europäische Union',
          'Gesellschaftspolitik, soziale Gruppen',
          'Gesundheit',
          'Innere Sicherheit',
          'Kultur',
          'Landwirtschaft und Ernährung',
          'Medien, Kommunikation und Informationstechnik',
          'Neue Bundesländer / innerdeutsche Beziehungen',
          'Öffentliche Finanzen, Steuern und Abgaben',
          'Politisches Leben, Parteien',
          'Raumordnung, Bau- und Wohnungswesen',
          'Recht',
          'Soziale Sicherung',
          'Sport, Freizeit und Tourismus',
          'Staat und Verwaltung',
          'Umwelt',
          'Verkehr',
          'Verteidigung',
          'Wirtschaft',
          'Wissenschaft, Forschung und Technologie',
        ],
        type: ['Antrag', 'Gesetzgebung'],
      },
      listTypes: ['PAST'],
      pageSize: 15,
      sort,
    },
  });

  if (error) return <div className="pt-16">Error! {error.message}</div>;

  return (
    <Main meta={<Meta title={''} description={''} />}>
      <div className="relative h-full px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        {/* <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div> */}
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Vergangen
              </h2>
              <p className="-mt-1 max-w-2xl text-base text-gray-600">
                Hier siehst Du alle bereits abgestimmten Vorgänge
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <FilterDropdown onSelect={(id: string) => setSort(id)} />
            </div>
          </div>
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
    </Main>
  );
};

export default Index;