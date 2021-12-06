﻿using BlogApi.Core.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Models
{
    public class Photo : IGuidKey
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public virtual ICollection<UserPhoto> UserPhotos { get; set; }
        public virtual ICollection<UserPhoto> UserProfilePhotos { get; set; }
    }
}