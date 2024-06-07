"""
เขียบนโปรแกรมแปลงตัวเลยเป็นคำอ่านภาษาไทย

[Input]
number: positive number rang from 0 to 10_000_000

[Output]
num_text: string of thai number call

[Example 1]
input = 101
output = หนึ่งร้อยเอ็ด

[Example 2]
input = -1
output = number can not less than 0
"""


class Solution:

    def number_to_thai(self, number: str) -> str:
        num_format = int(str(number).replace("_","")) 
        if num_format < 0:
            return "number can not less than 0"
        elif num_format > 10000000:
            return "number out range 10_000_000"
        thai_numbers_1_9 = [
            "ศูนย์","หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"
        ]
        thai_numbers_1_1000000 =  [
            "","สิบ","ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"

        ]
        len_number = len(str(num_format))-1
        num_str = str(num_format)
        result = ""
        index = 0
        for i in range(len_number,-1,-1) :
            num = int(num_str[i])
            if i == len_number :
                if num_str[i] == "1" :
                    result = "เอ็ด"
                elif num_str[i] != "0" :
                    result = thai_numbers_1_9[num]
            elif i == len_number-1 :
                if num != 0:
                    result = f'{"ยี่สิบ" if num == 2 else thai_numbers_1_1000000[1]}'+result
            elif i == len_number-7 :
                result = "สิบล้าน"+result
            elif  i < len_number-1 and num > 0:
                result = f'{thai_numbers_1_9[num]+thai_numbers_1_1000000[len_number-i]}'+result

        return result
    
test1 = Solution()
result = test1.number_to_thai("1_101") 
print(result)
result = test1.number_to_thai("221_121") 
print(result)
result = test1.number_to_thai("9_000_102") 
print(result)