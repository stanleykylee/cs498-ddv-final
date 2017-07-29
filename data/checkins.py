# -*- coding: utf-8 -*-
import csv
import pandas as pd
from datetime import datetime

# create empty dictionary
d = {}

def daytonumber(x):
    return {
        'Mon': 1,
        'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6,
        'Sun': 7,
    }[x]

def addCategory(checkin, category, checkins):
    if category not in checkin:
        checkin[category] = checkins
    else:
        checkin[category] += checkins

def addCheckin(yelp, checkin, category, checkins):
    split_checkin = checkin.split("-")
    # if int(split_checkin[1]) < 10:
    hour = round(float(split_checkin[1]) / 24, 2)
    translate_checkin = int((daytonumber(split_checkin[0])+hour) * 100)
    # translate_checkin = int(daytonumber(split_checkin[0]) * 24) + int(split_checkin[1])
    # translate_checkin = datetime(2017, 7, daytonumber(split_checkin[0]), int(split_checkin[1]))

    if translate_checkin not in yelp:
        yelp[translate_checkin] = {}
    addCategory(yelp[translate_checkin], category, checkins)

# import csv
with open('yelp_checkins.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=",")
    next(reader, None)  # skip the headers
    for row in reader:
        for checkin in eval(row[1]):
            addCheckin(d, checkin.split(":")[0], row[2], int(checkin.split(":")[1]))

# output to CSV for D3 consumption
data = pd.DataFrame(d)
data = data.fillna("0").astype(int)
data = data.transpose()
data.to_csv("./linechart.csv")
