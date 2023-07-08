## PERFORM SAMPLE PYTHON SCRIPT
from datetime import datetime
import pandas as pd
import requests
import json 
import sys

try: 
    jsonArg = json.loads(sys.argv[1].replace("'", '"'))
except Exception as e:
    print(f"Parameter is invalid: {e}")
    jsonArg = None

def main(args):

    if args['function'] == 'users':
        res = requests.get(url="https://reqres.in/api/users?page=1")

        if res.status_code == 200:
            data = json.loads(res.content)
            dataframe = pd.json_normalize(data['data'])

            print(f'\nData Fetched - Date: {datetime.now().strftime("%d-%m-%Y %H:%M")}\n\n{dataframe}\n\n')
        else:
            print('an error occurred with your request')

    elif args['function'] == 'test':
        print(f'\nScript Test - Status: OK - Date: {datetime.now().strftime("%d-%m-%Y %H:%M")}')


if __name__ == "__main__":
    main(jsonArg)
