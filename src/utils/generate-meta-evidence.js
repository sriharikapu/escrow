export default ({
  receiver,
  sender,
  title,
  description,
  fileURI,
  fileHash,
  amount,
  arbitrator,
  subCategory
}) => (
  {
    category: 'Escrow',
    subCategory,
    title,
    description,
    fileURI,
    fileHash,
    question: 'Which party abided by terms of the contract?',
    rulingOptions: {
      titles: ['Vote for Party A', 'Vote for Party B'],
      descriptions: ['Select to return funds to Party A', 'Select to release funds to Party B'],
    },
    aliases: {
      [receiver]: 'Party A',
      [sender]: 'Party B'
    },
    sender,
    receiver,
    amount,
    arbitrator
  }
)