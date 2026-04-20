namespace LibraryCoreApi.Entities
{
    public class Publisher
    {
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }


        public ICollection<Book> Books { get; set; }
    }
}
