/* จากโจทย์เราต้องการหา substring ของ Palindrome ที่มีความยาวมากที่สุด 
 ใช้วิธีการกระจายออกจาก middle ของก้อน string */

const longestPalindrome = (s) => {
  const strLength = s.length; //ในเคสที่จำนวนตัวอักษรมีน้อยกว่า 2 ซึ่งก็คือ 1 ตัวหรือเป็น null value เราก็ไม่ต้องไป process อะไรเลยก็ return มันออกมาเลย
  if (s == null || strLength < 2) return s;
  let start = 0,
    end = 0;
  let isOdd;
  let lenMax;

  //ใช้การ mod เพื่อ check ว่า string ทีส่งเข้ามาเป็นเลขคู่หรือคี่
  if (s.length % 2 == 0) {
    isOdd = false; //เป็นเลขคู่
  } else {
    isOdd = true; //เป็นเลขคี่
  }

  switch (
    isOdd //ทำการ switch case ระหว่างเลขคู่และเลขคี่
  ) {
    case false:
      //เริ่มจากการ loop เข้าไปเช็กที่แต่ละตัวอักษรโดยให้ i แต่ละครั้งเป็น center
      for (let i = 0; i < s.length; i++) {
        lenMax = expandFromMiddle(s, i, i + 1); //ความยาวของ Palindrome ที่เป็นเลขคู่ ถ้าเป็นเลขคู่คือมันจะมี Midpoint 2 ตัว เราก็จะให้ตำแหน่งเริ่มต้นเป็น i กับ i + 1 แล้วก็กระจายออกไป
        if (lenMax > end - start + 1) {
          //end - start + 1 = จะได้เท่ากับความยาวของตัว Parindrome ที่ยาวที่สุดของตอนนี้ ถ้าเป็นครั้งแรกก็จะ set ตัว start, end ให้เป็น 0 เอาไว้ตั้งแต่ข้างบน
          start = i - lenMax / 2 + 1; //center มันจะเคลื่อนไปทางซ้าย 1 ก็ทำการ add 1 เพิ่มกลับเข้ามา และจะได้ตำแหน่งเริ่มต้นของ Parindome ที่ยาวสุด ณ ตอนนั้น
          end = i + 1 + lenMax / 2 - 1; //center มันเลื่อนไปทางขวา 1 ก็ทำการลบ 1 และจะได้ตำแหน่งท้ายสุดของ Parindome ที่ยาวสุด ณ ตอนนั้น
        }
      }
      break;
    case true:
      //เริ่มจากการ loop เข้าไปเช็กที่แต่ละตัวอักษรโดยให้ i แต่ละครั้งเป็น center
      for (let i = 0; i < s.length; i++) {
        lenMax = expandFromMiddle(s, i, i); //ความยาวของ Palindrome ที่เป็นเลขคี่ ถ้าเป็นคี่ก็คือมันมี midpoint 1 ตัว เราก็ให้ตำแหน่งเริ่มต้นเป็นตำแหน่งเดียวกันแล้วค่อยกระจายออกไป
        if (lenMax > end - start + 1) {
          //end - start + 1 = จะได้เท่ากับความยาวของตัว Parindrome ที่ยาวที่สุดของตอนนี้ ถ้าเป็นครั้งแรกก็จะ set ตัว start, end ให้เป็น 0 เอาไว้ตั้งแต่ข้างบน
          start = i - Math.floor(lenMax / 2); //เมื่อ i เป็น center ก็ทำการลบส่วนของ length ที่หารด้วย 2 แล้ว โดยต้องใช้ floor เพราะจะมีเศษก็ให้ทำการปัดลง และจะได้ตำแหน่งเริ่มต้นของ Parindome ที่ยาวสุด ณ ตอนนั้น
          end = i + Math.floor(lenMax / 2); //จะได้ตำแหน่งท้ายสุดของ Parindome ที่ยาวสุด ณ ตอนนั้น
        }
      }
      break;
  }
  return s.substring(start, end + 1); //ส่วนนี้ก็จะได้ substring ออกมาโดยที่เราต้องให้ end + 1 เพราะว่ามันจะอยู่ในรูป [start, end) โดยเราต้องการเอา end ด้วยก็เพิ่ม 1 เข้าไป
};

const expandFromMiddle = (s, left, right) => {
  let L = left,
    R = right;
  while (L >= 0 && R < s.length && s[L] == s[R]) {
    //ใช้ L >= 0 && R < s.length เพื่อป้องกันการเกิด infinite loop และใช้ s[L], s[R] เพื่อเป็นการตรวจสอบ Palindrome
    L--;
    R++;
  } //เมื่อมันไม่เจอ Palindrome เพิ่มแล้วมันก็จะออกจากลูป แล้วเอา L, R ออกอย่างละ 1 เพราะว่าล่าสุดตอนที่เราไป check Palindrome รอบสุดท้ายเราทำการเพิ่ม R++ และ L-- เข้าไปแล้วซึ่งคู่นี้มันไม่เป็น Palindrome แล้วก็ทำการลบคืนเพื่อให้ได้ค่า Palindrome ล่าสุดออกมา
  R--;
  L++;
  return R - L + 1; //return ค่าเป็น length ออกมา
};
