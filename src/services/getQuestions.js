export async function getQuestions() {
  const res = await fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple', {
    method: 'get'
  });
  return res.json();
}
